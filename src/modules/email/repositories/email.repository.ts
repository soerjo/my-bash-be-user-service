import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { EmailTemplateEntity } from "../entities/email.entity";

@Injectable()
export class EmailRepository extends Repository<EmailTemplateEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(EmailTemplateEntity, dataSource.createEntityManager());
  }
}