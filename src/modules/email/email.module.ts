import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { EmailRepository } from './repositories/email.repository';
import { EmailAttachmentRepository } from './repositories/email-attachment.repository';
import { EmailController } from './controllers/email.controller';

@Module({
  controllers: [EmailController],
  providers: [
    EmailService, 
    EmailRepository,
    EmailAttachmentRepository,
  ],
  exports: [EmailService],
})
export class EmailModule {}
