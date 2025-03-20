import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { ChangePasswordTokenDto } from '../dto/change-password.dto';
import { reqForgotPassDto } from '../dto/request-forgot-password.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { VerifiedEmailDto } from '../dto/verified-email.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }
  
  @Post('forgot-password') // Forgot Password
  @HttpCode(200)
  async requestForgotPassword(@Body() dto: reqForgotPassDto) {
    this.authService.requestForgotPassword(dto.email);
  }

  @Post('change-password') // get link from email
  @HttpCode(200)
  async changePassword(@Body() dto: ChangePasswordTokenDto) {
    return this.authService.changePasswordByEmail(dto);
  }

  @Post('verified-email') // get link from email
  @HttpCode(200)
  async verfiedEmail(@Body() dto: VerifiedEmailDto) {
    return this.authService.verifiedEmail(dto);
  }

  @Post('register-bank')
  @HttpCode(200)
  async registerBank(@Body() createAuthDto: RegisterUserDto) {
    return this.authService.registerBank(createAuthDto);
  }

  @Post('register-user')
  @HttpCode(200)
  async registerUser(@Body() createAuthDto: RegisterUserDto) {
    return this.authService.registerUser(createAuthDto);
  }
}
