import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { UserService } from '../../user/services/user.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { validatePassword } from '../../../utils/hashing.util';
import { ChangePasswordTokenDto } from '../dto/change-password.dto';
import { sendResetPasswordEmail, sendVerificationEmail } from '../../../utils/email.util';
import { RoleEnum } from '../../../common/constant/role.constant';
import { RegisterUserDto } from '../dto/register-user.dto';
import { AUTH_EMAIL_REQUEST } from '../../../common/constant/auth-email-request.constant';
import { VerifiedEmailDto } from '../dto/verified-email.dto';
import { DataSource } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { BankService } from 'src/modules/bank/services/bank.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly bankService: BankService,
  ) {}

  generateJwt(dto: any) {
    const payload: IJwtPayload = {
      id: dto.id,
      name: dto.name,
      username: dto.username,
      email: dto.email,
      role_id: dto.role_id,
      bank_id: dto.bank_id,
      is_temp_password: dto.temp_password ? true : false,
      ...dto,
    };
    const jwt = this.jwtService.sign(payload);

    return { payload, jwt };
  }

  decodeJwt(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('PUBLIC_KEY'),
    });
  }

  async login(dto: CreateAuthDto) {
    const user = await this.userService.getByUsernameOrEmail(dto.usernameOrEmail);

    if (!user) throw new BadRequestException('username or email or password is not valid');

    if (!user.is_email_verified) throw new BadRequestException('user email is not verified');

    if (!user.password && !user.temp_password) throw new BadRequestException('user is not valid');

    if (
      (user.password && !validatePassword(dto.password, user.password)) ||
      (user.temp_password && !validatePassword(dto.password, user.temp_password))
    )
      throw new BadRequestException('username or email or password is not valid');

    return this.generateJwt(instanceToPlain(user));
  }

  async requestForgotPassword(userEmail: string) {
    const user = await this.userService.getByUsernameOrEmail(userEmail);
    if (!user) return;

    const token = this.generateJwt({...user, request: AUTH_EMAIL_REQUEST.FORGOT_PASSWORD});
    await sendResetPasswordEmail(userEmail, token.jwt);
  }

  async changePasswordByEmail(dto: ChangePasswordTokenDto){
    try {
      const payload = await this.decodeJwt(dto.token_from_email);
      if(payload?.request !== AUTH_EMAIL_REQUEST.FORGOT_PASSWORD) throw new BadRequestException('Token is not valid');
      await this.userService.changePassword(payload, { new_password: dto.new_password });
    } catch (error) {
      throw new BadRequestException('Token is not valid');
    }
  }

  async verifiedEmail(dto: VerifiedEmailDto){
    try {
      const payload = await this.decodeJwt(dto.token_from_email);
      if(payload?.request !== AUTH_EMAIL_REQUEST.VERIFY_EMAIL) throw new BadRequestException('Token is not valid');
      await this.userService.verifiedEmail(payload);
    } catch (error) {
      throw new BadRequestException('Token is not valid');
    }
  }

  async registerBank(dto: RegisterUserDto) {
    return this.dataSource.transaction(async (manager) => {
      const user = await this.userService.createNew({
        email: dto.email,
        username: dto.username,
        name: dto.username,
        password: dto.password,
        phone: dto?.phone,
        role_id: RoleEnum.USER_SUPER_ADMIN_BANK,
      }, manager);
      
      const bank = await this.bankService.createBank({
        name: dto.username + "_bank",
        owner_id: user.id,
        address: dto.address,
        phone: dto?.phone,
        province: dto.province,
        regency: dto.regency,
        district: dto.district,
        village: dto.village,
        postal_code: dto.postal_code,
      });
      
      await this.userService.updateUser(
        user.id,
        {
          ...user,
          bank_id: bank.id,
        },
        manager,
      );
      
      const token = this.jwtService.sign({...user, request: AUTH_EMAIL_REQUEST.VERIFY_EMAIL});
      await sendVerificationEmail(user.email, token);
    }).catch((error) => {
      throw new BadRequestException(error?.message);
    });
  }

  async registerUser(dto: RegisterUserDto) {
    return this.dataSource.transaction(async (manager) => {
      const user = await this.userService.createNew({
        email: dto.email,
        username: dto.username,
        name: dto.username,
        password: dto.password,
        role_id: RoleEnum.USER_CUSTOMER,
      }, manager);

      const token = this.jwtService.sign({...user, request: AUTH_EMAIL_REQUEST.VERIFY_EMAIL});
      await sendVerificationEmail(user.email, token);
    }).catch((error) => {
      throw new BadRequestException(error?.message);
    });
  }

}
