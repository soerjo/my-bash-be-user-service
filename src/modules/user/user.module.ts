import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { RoleEntity } from './entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';
// import { BankModule } from '../bank/bank.module';

@Module({
  imports: [
    // BankModule,
    EmailModule,
    JwtModule,
    TypeOrmModule.forFeature([UserEntity, RoleEntity])
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
