import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationRepository } from './repositories/notification.repository';

@Module({
  providers: [NotificationService, NotificationRepository],
})
export class NotificationModule {}
