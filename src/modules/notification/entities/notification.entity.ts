import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { NotificationLogEntity } from "./notification-log.entity";

@Entity({ name: 'notification', schema: 'user' })
export class NotificationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ nullable: true })
    created_by: number;

    @Column({ nullable: true })
    tag: string;

    @Column({ nullable: true })
    subject: string;

    @Column({ nullable: true })
    message: string;

    @Column({ nullable: true })
    user_id: number;

    @OneToOne(() => NotificationLogEntity, (notification_log) => notification_log.notification)
    notification_log: NotificationLogEntity;
}
