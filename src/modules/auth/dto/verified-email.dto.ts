import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class VerifiedEmailDto {
    @ApiProperty({ example: 'token....' })
    @IsString()
    @IsNotEmpty()
    token_from_email: string;
}