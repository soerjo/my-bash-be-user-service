import { Controller, Post, Body, BadRequestException, HttpCode } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { validatePassword } from '../../../utils/hashing.util';
import { UserService } from '../../../modules/user/user.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async create(@Body() createAuthDto: CreateAuthDto) {
    const user = await this.userService.getByUsernameOrEmail(createAuthDto.usernameOrEmail);

    if (!user) throw new BadRequestException('username or email or password is not valid');

    if (!user.password && !user.temp_password) throw new BadRequestException('user is not valid');

    if (
      (user.password && !validatePassword(createAuthDto.password, user.password)) ||
      (user.temp_password && !validatePassword(createAuthDto.password, user.temp_password))
    )
      throw new BadRequestException('username or email or password is not valid');

    const result = this.authService.generateJwt(user);

    // const Region = String(user?.region?.name).toUpperCase() ?? 'E-GEREJA';
//     if (user.telegram_user_id) {
//       this.botService.sendMail({
//         telegram_user_id: user.telegram_user_id,
//         message: `
// ${Region}
// Kami melihat adanya aktivitas login pada,
// Akun: ${user.username}
// Nama: ${user.name}
// Role: ${user.role}
// Tanggal: ${new Date().toLocaleDateString('id')}
//         `,
//       });
//     }

    return result;
  }
}
