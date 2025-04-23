import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { NotificationEntity } from "./notification.entity";

@Entity({ name: 'notification-log', schema: 'user' })
export class NotificationLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  notification_id: string;

  @Column()
  user_id: number;

  @OneToOne(() => NotificationEntity, (notification) => notification.notification_log)
  @JoinColumn({name: 'notification_id', referencedColumnName: 'id' })
  notification: NotificationEntity;
}
