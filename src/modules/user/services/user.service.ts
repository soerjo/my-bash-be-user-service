import { BadRequestException, ForbiddenException, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { encryptPassword } from '../../../utils/hashing.util';
import { UserRepository } from '../repositories/user.repository';
import { FindUserDto } from '../dto/find-user.dto';
import { RoleEnum } from '../../../common/constant/role.constant';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { instanceToPlain } from 'class-transformer';
import { DataSource, EntityManager, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserBankDto } from '../dto/create-user-bank.dto';
// import { BankService } from '../../../modules/bank/services/bank.service';
import { sendVerificationEmail } from '../../../utils/email.util';
import { InjectRepository } from '@nestjs/typeorm';
import {  } from "typeorm";
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class UserService implements OnModuleInit  {

  constructor(
    private readonly dataSource: DataSource,
    private readonly usersRepository: UserRepository,
    private readonly configService: ConfigService,

    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,

    
  ) {}

  async onModuleInit() {
    console.log(`=================================`)
    console.log(`initialized user service`)
    console.log(`=================================`);

    const adminName = this.configService.get<string>('ROOT_ADMIN_NAME');
    const adminUsername = this.configService.get<string>('ROOT_ADMIN_USERNAME');
    const adminEmail = this.configService.get<string>('ROOT_ADMIN_EMAIL');
    const adminPassword = encryptPassword(this.configService.get<string>('ROOT_ADMIN_PASSWORD'));

    const user = await this.usersRepository.findOneByUsername(adminUsername);
    if(user) return;

    await this.usersRepository.createUser({
      name: adminName,
      username: adminUsername,
      email: adminEmail,
      password: adminPassword,
      role_id: RoleEnum.SYSTEM_ADMIN,
      is_email_verified: true,
    });

    console.log(`=================================`)
    console.log(`success initialized user service`)
    console.log(`=================================`);
  }

  async getByUsernameOrEmail(usernameOrEmail: string, userPayload?: IJwtPayload) {
    return this.usersRepository.findOneByUsernameOrEmail(usernameOrEmail);
  }

  async resetPassword(dto: ResetPasswordDto, userPayload: IJwtPayload) {
    const user = await this.usersRepository.findOneById(dto.user_id);
    if(!user) throw new BadRequestException('User not found');

    if(userPayload.role_id >= user.role_id) {
      throw new ForbiddenException('User role is not allowed to reset password');
    }

    await this.usersRepository.update(user.id, {
      password: null,
      temp_password: encryptPassword(dto.temp_password),
      updated_by: userPayload.id,
    })
  }

  async changePassword(userPayload: IJwtPayload, dto: ChangePasswordDto) {
    const user = await this.usersRepository.findOneById(userPayload.id);
    if(!user) throw new BadRequestException('User not found');

    if(userPayload.id != user.id) {
      throw new ForbiddenException('User can not change password');
    }

    await this.usersRepository.update(user.id, {
      password: encryptPassword(dto.new_password),
      temp_password: '',
      updated_by: userPayload.id,
    })
  }

  async verifiedEmail(userPayload: IJwtPayload) {
    const user = await this.usersRepository.findOneById(userPayload.id);
    if(!user) throw new BadRequestException('User not found');

    if(userPayload.id != user.id) {
      throw new BadRequestException('Validation email is failed');
    }

    await this.usersRepository.update(user.id, {
      is_email_verified: true,
      updated_by: userPayload.id,
    })
  }

  async createNew(createUserDto: CreateUserDto, manager?: EntityManager) {
    const isUsernameExist = await this.usersRepository.findOneByUsernameOrEmail(createUserDto.username, manager);
    if(isUsernameExist) throw new BadRequestException('Username already exist');

    const isEmailExist = await this.usersRepository.findOneByUsernameOrEmail(createUserDto.email, manager);
    if(isEmailExist) throw new BadRequestException('Email already exist');

    
    const user = await this.usersRepository.createUser({
      ...createUserDto,
      password: encryptPassword(createUserDto.password),
      is_email_verified: false,
    }, manager);
    return instanceToPlain(user)
  }

  async createUserBank(createUserDto: CreateUserBankDto, userPayload: IJwtPayload) {
    return this.dataSource.transaction(async (manager) => {
      const isUsernameExist = await this.usersRepository.findOneByUsernameOrEmail(createUserDto.username, manager);
      if(isUsernameExist) throw new BadRequestException('Username already exist');

      const isEmailExist = await this.usersRepository.findOneByUsernameOrEmail(createUserDto.email, manager);
      if(isEmailExist) throw new BadRequestException('Email already exist');
      
      const generateDefaultPassword = Math.random().toString(36).substring(2, 14);
      const user = await this.usersRepository.createUser({
        ...createUserDto,
        name: createUserDto.username,
        username: createUserDto.username,
        is_email_verified: true,
        temp_password: encryptPassword(generateDefaultPassword),
        created_by: userPayload.id,
        bank_id: createUserDto.bank_id,
        warehouse_id: createUserDto.warehouse_id,
        role_id: RoleEnum.ADMIN_BANK,
      }, manager);
      
      // await sendVerificationEmail(user.email, generateDefaultPassword);
      
      // return instanceToPlain(user)
      return {
        ...user,
        temp_password: generateDefaultPassword,
      };
    }).catch((error) => {
      throw new BadRequestException(error?.message);
    });
  }

  async updateUser(userId: number, dto: Partial<UserEntity>, manager?: EntityManager) {
    const user = await this.usersRepository.findOneById(userId, manager);
    if(!user) throw new BadRequestException(`User id ${userId} not found`);

    return this.usersRepository.updateUser(user.id, {
      ...user,
      ...dto,
    }, manager);
  }

  findAll(dto: FindUserDto, userPayload: IJwtPayload) {
    return this.usersRepository.findAll(dto, userPayload);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneById(id);
    return instanceToPlain(user)
  }

  getRoles(userPayload: IJwtPayload){
    return this.roleRepository.find({where: {role_id: MoreThanOrEqual(userPayload.role_id)}});
  }
}
