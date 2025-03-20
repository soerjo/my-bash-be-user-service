import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { UserModule } from '../user/user.module';
import { BankModule } from '../bank/bank.module';

@Module({
  imports: [
    BankModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          privateKey: config.get<string>('PRIVATE_KEY'),
          publicKey: config.get<string>('PUBLIC_KEY'),
          signOptions: { 
            algorithm: 'RS256', 
            expiresIn: '8h',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAuthGuard,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ClassSerializerInterceptor,
    // },
  ],
})
export class AuthModule {}
