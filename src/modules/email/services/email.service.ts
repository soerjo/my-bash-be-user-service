import { Injectable } from '@nestjs/common';
import { EmailRepository } from '../repositories/email.repository';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { In } from 'typeorm';
import { CreateEmailDto } from '../dto/create-email.dto';
import { EmailAttachmentRepository } from '../repositories/email-attachment.repository';
import { createTransport } from 'nodemailer';
import { SendEmailDto } from '../dto/send-email.dto';

@Injectable()
export class EmailService {
  constructor(
    private readonly emailRepository: EmailRepository,
    private readonly emailAttachmentRepository: EmailAttachmentRepository,
    private readonly configService: ConfigService,
  ) {}

  async createEmail(dto: CreateEmailDto, userPayload: IJwtPayload) {
    const getAttachments = await this.emailAttachmentRepository.find({
      where: { id: In([dto.attachment_ids]) },
    });

    const createEmail = this.emailRepository.create({
      name: dto.name,
      html: dto.html,
      description: dto.description,
      subject: dto.subject,
      attachments: getAttachments,
      created_by: userPayload.id,
    })

    await this.emailRepository.save(createEmail)
  }

  async updateEmail(id: number, dto: CreateEmailDto, userPayload: IJwtPayload) {
    const email = await this.emailRepository.findOne({ where: { id } });
    if (!email) throw new Error(`Email template with id ${id} not found`);

    const getAttachments = await this.emailAttachmentRepository.find({
      where: { id: In([dto.attachment_ids]) },
    });

    email.name = dto.name;
    email.html = dto.html;
    email.description = dto.description;
    email.subject = dto.subject;
    email.attachments = getAttachments;
    email.updated_by = userPayload.id;

    await this.emailRepository.save(email);
  }

  async sendEmail(emailTemplate: string, payload: Record<string, any>) {
    const email = await this.emailRepository.findOne({ 
      where: { 
        name: emailTemplate 
      },
      relations: ['attachments'],
    });
    if (!email) throw new Error(`Email template ${emailTemplate} not found`);

    payload.fe_url = this.configService.get<string>('FRONTENT_URL');

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        email.html = email.html.replaceAll(`{{${key}}}`, payload[key]);
      }
    }

    await this.sendTemplateEmail({
      userEmail: payload.email,
      emailTemplate: email.html,
      subject: email.subject,
      attachments: email.attachments,
    });
  }

  findOne(emailTemplateName: string) {
    return  this.emailRepository.findOne({ where: { name: emailTemplateName } });
  }

  async sendTemplateEmail (dto: SendEmailDto) {
    const transporter = createTransport({
      service: 'Gmail',
      auth: {
        user: this.configService.get<string>("EMAIL_FROM"),
        pass: this.configService.get<string>("EMAIL_PASSWORD"),
      },
    });
  
    await transporter.sendMail({
      from: this.configService.get<string>("EMAIL_FROM"),
      to: dto.userEmail,
      subject: dto.subject,
      html: dto.emailTemplate,
      attachments: dto.attachments.map((attachment) => ({
        filename: attachment.filename,
        path: __dirname + attachment.path,
        cid: attachment.cid,
      })),
    });
  
    console.log('Email sent!');
  };

  async getAllEmailTemplate() {
    return this.emailRepository.find({
      select: ['id', 'name', 'description', 'subject', 'attachments'],
      relations: ['attachments'],
    });
  }

  async getAllEmailAttachment() {
    return this.emailAttachmentRepository.find({
      select: ['id', 'filename', 'path', 'cid'],
      // relations: ['attachments'],
    });
  }

}
