import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../../common/decorator/jwt-payload.decorator";
import { JwtAuthGuard } from "../../../common/guard/jwt-auth.guard";
import { RolesGuard } from "../../../common/guard/role.guard";
import { IJwtPayload } from "../../../common/interface/jwt-payload.interface";
import { NotificationService } from "../services/notification.service";
import { FindNotificationDto } from "../dto/find-notification.dto";
import { CreateNotificationDto } from "../dto/create-notification.dto";
import { Roles } from "src/common/decorator/role.decorator";
import { RoleEnum } from "src/common/constant/role.constant";

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  getNotification(@CurrentUser() userPayload: IJwtPayload, @Query() dto: FindNotificationDto) {
    return this.notificationService.findByUserId({...dto, userId: userPayload.id});
  }

  @Get('has-read/:notificationId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  readNotification(@Param('notificationId') notificationId: string, @CurrentUser() userPayload: IJwtPayload) {
    return this.notificationService.hasRead(notificationId, userPayload.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  createNotification(@Body() dto: CreateNotificationDto, @CurrentUser() userPayload: IJwtPayload) {
    return this.notificationService.create(dto, userPayload);
  }
}