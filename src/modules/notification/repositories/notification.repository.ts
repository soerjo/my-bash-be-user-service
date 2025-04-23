import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { NotificationEntity } from "../entities/notification.entity";
import { NotificationLogEntity } from "../entities/notification-log.entity";
import { FindNotificationDto } from "../dto/find-notification.dto";

@Injectable()
export class NotificationRepository extends Repository<NotificationEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(NotificationEntity, dataSource.createEntityManager());
  }

  async getByUserId(dto: FindNotificationDto) {
    const queryBuilder = this.createQueryBuilder('notification');
    queryBuilder.leftJoinAndSelect(NotificationLogEntity, 'notification_log', 'notification_log.notification_id = notification.id');
    queryBuilder.select([
      // 'notification.id as id',
      "notification.id as id",
      "notification.created_at as created_at",
      "notification.tag as tag",
      "notification.subject as subject",
      "notification.message as message",
      "notification.user_id as user_id",
      `
        CASE 
          WHEN notification_log.id is not null THEN true
          ELSE false
        END AS is_read
      `
      // "notification.log_id as log_id",
    ]);


    queryBuilder.orderBy('notification.created_at', 'DESC')
    queryBuilder.skip((dto.page - 1) * dto.take).take(dto.take)
  
    const queryItemCount = queryBuilder.getCount()
    const queryUser = queryBuilder.getRawMany()
    const [itemCount, rawData] = await Promise.all([queryItemCount, queryUser])

    const meta = {
      page: dto?.page,
      offset: dto?.take,
      itemCount,
      pageCount: Math.ceil(itemCount / dto?.take) ? Math.ceil(itemCount / dto?.take) : 0,
    };

    const processedData = rawData.map(data => ({
      ...data, 
    }))
    
    return { data: processedData, meta}  }
}