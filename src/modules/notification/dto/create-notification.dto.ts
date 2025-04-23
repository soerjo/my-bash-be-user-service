import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
    @ApiProperty()
    @IsString()
    tag: string;

    @ApiProperty()
    @IsString()
    subject: string;

    @ApiProperty()
    @IsString()
    message: string;

    @ApiProperty()
    @IsNumber()
    user_id: number;
}
