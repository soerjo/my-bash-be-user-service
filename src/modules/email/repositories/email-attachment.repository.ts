import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { EmailAttachmentEntity } from "../entities/email-attachment.entity";

@Injectable()
export class EmailAttachmentRepository extends Repository<EmailAttachmentEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(EmailAttachmentEntity, dataSource.createEntityManager());
  }
}