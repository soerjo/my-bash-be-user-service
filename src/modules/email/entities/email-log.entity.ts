import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'email-log', schema: 'user' })
export class EmailLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  email_template_name: string;

  @Column({ nullable: true })
  subject: string;

  @Column({ nullable: true })
  to: string;

  @Column({ nullable: true, type: 'jsonb', default: {} })
  payload: Record<string, any>;

}
