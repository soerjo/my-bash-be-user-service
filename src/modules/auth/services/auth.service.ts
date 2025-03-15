import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { UserService } from '../../user/services/user.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { validatePassword } from '../../../utils/hashing.util';
import { UserEntity } from '../../../modules/user/entities/user.entity';
import { ChangePasswordTokenDto } from '../dto/change-password.dto';
import sendVerificationEmail from '../../../utils/email.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  generateJwt(user: Partial<UserEntity>) {
    const payload: IJwtPayload = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role_id: user.role_id,
      bank_id: user.bank_id,
      is_temp_password: user.temp_password ? true : false,
    };
    const jwt = this.jwtService.sign(payload);

    return { payload, jwt };
  }

  decodeJwt(token: string): Promise<IJwtPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('PUBLIC_KEY'),
    });
  }

  async login(dto: CreateAuthDto) {
    const user = await this.userService.getByUsernameOrEmail(dto.usernameOrEmail);

    if (!user) throw new BadRequestException('username or email or password is not valid');

    if (!user.password && !user.temp_password) throw new BadRequestException('user is not valid');

    if (
      (user.password && !validatePassword(dto.password, user.password)) ||
      (user.temp_password && !validatePassword(dto.password, user.temp_password))
    )
      throw new BadRequestException('username or email or password is not valid');

    return this.generateJwt(user);
  }

  async requestForgotPassword(userEmail: string) {
    const user = await this.userService.getByUsernameOrEmail(userEmail);
    if (!user) return;

    const token = this.generateJwt(user);
    await sendVerificationEmail(userEmail, token.jwt);
  }

  async changePasswordByEmail(dto: ChangePasswordTokenDto){
    try {
      const payload = await this.decodeJwt(dto.token_from_email);
      await this.userService.changePassword(payload, {
        new_password: dto.new_password,
      });
    } catch (error) {
      throw new BadRequestException('Token is not valid');
    }
  }

}
