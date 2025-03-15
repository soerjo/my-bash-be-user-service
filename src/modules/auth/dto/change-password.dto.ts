import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordTokenDto {
    @ApiProperty({ example: 'token....' })
    @IsString()
    @IsNotEmpty()
    token_from_email: string;

    @ApiProperty({ example: 'new_password' })
    @IsString()
    @IsNotEmpty()
    new_password: string;
}