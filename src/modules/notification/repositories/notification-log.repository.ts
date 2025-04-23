import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { NotificationLogEntity } from "../entities/notification-log.entity";
import { FindNotificationDto } from "../dto/find-notification.dto";

@Injectable()
export class NotificationLogRepository extends Repository<NotificationLogEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(NotificationLogEntity, dataSource.createEntityManager());
  }
}