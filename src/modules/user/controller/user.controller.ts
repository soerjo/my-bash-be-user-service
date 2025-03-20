import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindUserDto } from '../dto/find-user.dto';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../../common/guard/role.guard';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { Roles } from '../../../common/decorator/role.decorator';
import { RoleEnum } from '../../../common/constant/role.constant';
import { CurrentUser } from '../../../common/decorator/jwt-payload.decorator';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CreateUserBankDto } from '../dto/create-user-bank.dto';
import { ValidateUserNameDto } from '../dto/validate-user-name.dto';
import { JwtOpenAuthGuard } from 'src/common/guard/jwt-open-auth.guard';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles([    
    RoleEnum.SYSTEM_ADMIN, 
    RoleEnum.SUPER_ADMIN, 
    RoleEnum.USER_ADMIN_BANK, 
    RoleEnum.USER_SUPER_ADMIN_BANK,
  ])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  create(@CurrentUser() userPayload: IJwtPayload, @Body() dto: CreateUserBankDto) {
    return this.userService.createUserBank(dto, userPayload);
  }

  @Post('/reset-password')
  @Roles([
    RoleEnum.SYSTEM_ADMIN, 
    RoleEnum.SUPER_ADMIN, 
    RoleEnum.USER_ADMIN_BANK, 
    RoleEnum.USER_SUPER_ADMIN_BANK,
  ])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  resetPassword(@CurrentUser() userPayload: IJwtPayload, @Body() dto: ResetPasswordDto) {
    return this.userService.resetPassword(dto, userPayload);
  }

  @Post('/change-password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  changePassword(@CurrentUser() userPayload: IJwtPayload, @Body() dto: ChangePasswordDto) {
    if(!userPayload.is_temp_password) throw new BadRequestException('You are not allowed to change password');
    return this.userService.changePassword(userPayload, dto);
  }


  @Get()
  @Roles([
    RoleEnum.SYSTEM_ADMIN, 
    RoleEnum.SUPER_ADMIN, 
    RoleEnum.USER_ADMIN_BANK, 
    RoleEnum.USER_SUPER_ADMIN_BANK,
  ])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  findAll(@CurrentUser() userPayload: IJwtPayload, @Query() dto: FindUserDto) {
    return this.userService.findAll(dto, userPayload);
  }

  @Get('/validate-email-username/:email_username')
  @UseGuards(JwtOpenAuthGuard)
  @ApiBearerAuth()
  async validateUsername(@CurrentUser() userPayload: IJwtPayload, @Param('email_username') email_username: string) {
    const user = await this.userService.getByUsernameOrEmail(email_username, userPayload)
    if(user) throw new BadRequestException('email or username already exists');
    return { message: 'email or username is available' };
  }

  @Get(':id')
  @Roles([
    RoleEnum.SYSTEM_ADMIN, 
    RoleEnum.SUPER_ADMIN, 
    RoleEnum.USER_SUPER_ADMIN_BANK,
  ])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('my-detail')
  @Roles([
    RoleEnum.SYSTEM_ADMIN, 
    RoleEnum.SUPER_ADMIN, 
    RoleEnum.USER_SUPER_ADMIN_BANK,
  ])
  @ApiBearerAuth()
  findMyDetail(@CurrentUser() userPayload: IJwtPayload,) {
    return this.userService.findOne(+userPayload.id);
  }
}
