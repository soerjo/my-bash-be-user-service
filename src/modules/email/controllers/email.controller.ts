import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { EmailService } from "../services/email.service";
import { Roles } from "../../../common/decorator/role.decorator";
import { RoleEnum } from "../../../common/constant/role.constant";
import { JwtAuthGuard } from "../../../common/guard/jwt-auth.guard";
import { RolesGuard } from "../../../common/guard/role.guard";
import { CurrentUser } from "../../../common/decorator/jwt-payload.decorator";
import { IJwtPayload } from "../../../common/interface/jwt-payload.interface";
import { CreateEmailDto } from "../dto/create-email.dto";


@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([ RoleEnum.SYSTEM_ADMIN ])
  @ApiBearerAuth()
  createCustomer(@CurrentUser() userPayload: IJwtPayload, @Body() dto: CreateEmailDto) {
    return this.emailService.createEmail(dto, userPayload);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([ RoleEnum.SYSTEM_ADMIN ])
  @ApiBearerAuth()
  updateCustomer(@Param("id") id: string, @CurrentUser() userPayload: IJwtPayload, @Body() dto: CreateEmailDto) {
    return this.emailService.updateEmail(+id, dto, userPayload);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([ RoleEnum.SYSTEM_ADMIN ])
  @ApiBearerAuth()
  getAllEmailTemplate() {
    return this.emailService.getAllEmailTemplate();
  }

  @Get('attachments')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([ RoleEnum.SYSTEM_ADMIN ])
  @ApiBearerAuth()
  getAllEmailAttachments() {
    return this.emailService.getAllEmailAttachment();
  }

}