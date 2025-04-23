import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { EmailRepository } from './repositories/email.repository';
import { EmailAttachmentRepository } from './repositories/email-attachment.repository';
import { EmailController } from './controllers/email.controller';
import { EmailLogRepository } from './repositories/email-log.repository';

@Module({
  controllers: [EmailController],
  providers: [
    EmailService, 
    EmailRepository,
    EmailAttachmentRepository,
    EmailLogRepository,
  ],
  exports: [EmailService],
})
export class EmailModule {}
