import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { NotificationRepository } from '../repositories/notification.repository';
import { FindNotificationDto } from '../dto/find-notification.dto';
import { NotificationLogRepository } from '../repositories/notification-log.repository';
import { IJwtPayload } from 'src/common/interface/jwt-payload.interface';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly notificationLogRepository: NotificationLogRepository,
  ) {}

  async create(createNotificationDto: CreateNotificationDto, userPayload: IJwtPayload) {
    const createNotfication = this.notificationRepository.create({
      tag: createNotificationDto.tag,
      subject: createNotificationDto.subject,
      message: createNotificationDto.message,
      user_id: createNotificationDto.user_id,
      created_by: userPayload.id,
    })
    
    await this.notificationRepository.save(createNotfication);
  }

  async hasRead(notificationId: string, userId: number) {
    const notification = await this.notificationRepository.findOne({ 
      where: { 
        id: notificationId, 
        user_id: userId,
      },
      relations: ['notification_log'],
    });

    if(!notification) throw new BadRequestException('Notification not found');

    const createNotificationLog = this.notificationLogRepository.create({
      notification_id: notification.id,
      user_id: userId,
    })

    await this.notificationLogRepository.save(createNotificationLog);
  }

  findByUserId(dto: FindNotificationDto) {
    return this.notificationRepository.getByUserId(dto);
  }

}
