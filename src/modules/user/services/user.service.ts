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

@Injectable()
export class UserService implements OnModuleInit  {

  constructor(
    private usersRepository: UserRepository,
    private configService: ConfigService
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
    });

    console.log(`=================================`)
    console.log(`success initialized user service`)
    console.log(`=================================`);
  }

  getByUsernameOrEmail(usernameOrEmail: string) {
    return this.usersRepository.findOneByUsernameOrEmail(usernameOrEmail);
  }

  async resetPassword(dto: ResetPasswordDto, userPayload: IJwtPayload) {
    const user = await this.usersRepository.findOneById(dto.user_id);
    if(!user) throw new BadRequestException('User not found');

    if(userPayload.role_id >= user.role_id) {
      throw new ForbiddenException('User role is not allowed to reset password');
    }

    await this.usersRepository.update(user.id, {
      password: '',
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

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(dto: FindUserDto, userPayload: IJwtPayload) {
    return this.usersRepository.findAll(dto, userPayload);
  }

  findOne(id: number) {
    return this.usersRepository.findOneById(id);
  }
}
