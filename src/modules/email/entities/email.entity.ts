import { MainEntityAbstract } from "../../../common/abstract/main-entity.abstract";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { EmailAttachmentEntity } from "./email-attachment.entity";

@Entity({ name: 'email-template', schema: 'user' })
export class EmailTemplateEntity extends MainEntityAbstract {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true, type: 'text' })
  html: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  subject: string;

  // @OneToMany(() => EmailAttachmentEntity, (emailAttachment) => emailAttachment.email)
  @ManyToMany(() => EmailAttachmentEntity, emailAttachment => emailAttachment.email)
  attachments?: EmailAttachmentEntity[];
}
