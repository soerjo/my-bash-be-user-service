import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class reqForgotPassDto {
    @ApiProperty({ example: 'mail@mail.com' })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}