import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { encryptPassword } from '../../utils/hashing.util';
import { UserRepository } from './user.repository';
import { FindUserDto } from './dto/find-user.dto';
import { RoleEnum } from '../../common/constant/role.constant';

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
      role_id: RoleEnum.ROLE_SYSTEM_ADMIN,
    });

    console.log(`=================================`)
    console.log(`success initialized user service`)
    console.log(`=================================`);
  }

  getByUsernameOrEmail(usernameOrEmail: string) {
    return this.usersRepository.findOneByUsernameOrEmail(usernameOrEmail);

  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(dto: FindUserDto) {
    return this.usersRepository.findAll(dto);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
