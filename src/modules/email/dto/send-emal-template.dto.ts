import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsObject, IsOptional, IsString } from "class-validator";

export class SendEmailTemplateDto {
    @ApiProperty()
    @IsString()
    emailTemplate: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    payload?: Record<string, any>;
}