import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationRepository } from './repositories/notification.repository';
import { NotificationController } from './controllers/notification.controller';
import { NotificationLogRepository } from './repositories/notification-log.repository';

@Module({
  controllers: [NotificationController],
  providers: [
    NotificationService, 
    NotificationRepository,
    NotificationLogRepository,
  ],
})
export class NotificationModule {}
