import { MainEntityAbstract } from "../../../common/abstract/main-entity.abstract";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { EmailTemplateEntity } from "./email.entity";

@Entity({ name: 'email-attachment', schema: 'user' })
export class EmailAttachmentEntity extends MainEntityAbstract {
  @Column({nullable: true})
  filename: string;

  @Column({nullable: true})
  path: string;

  @Column({nullable: true})
  cid?: string;

  // @Column()
  // email_id: number;

  // @ManyToOne(() => EmailTemplateEntity)
  @ManyToMany(() => EmailTemplateEntity, email => email.attachments, { cascade: true })
  // @JoinColumn({ name: 'email_id', referencedColumnName: 'id' })
  @JoinTable({
    name: 'email-template_email-attachment',
    joinColumn: { name: 'attachment_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'amail_id', referencedColumnName: 'id' },
  })
  email: EmailTemplateEntity[]
  
}
