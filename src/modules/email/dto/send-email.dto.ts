import { EmailAttachmentEntity } from "../entities/email-attachment.entity";

export class SendEmailDto {
  userEmail: string;
  emailTemplate: string;
  subject: string;
  attachments?: EmailAttachmentEntity[];
}