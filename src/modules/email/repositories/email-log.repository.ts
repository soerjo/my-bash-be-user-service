import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { EmailLogEntity } from "../entities/email-log.entity";

@Injectable()
export class EmailLogRepository extends Repository<EmailLogEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(EmailLogEntity, dataSource.createEntityManager());
  }
}