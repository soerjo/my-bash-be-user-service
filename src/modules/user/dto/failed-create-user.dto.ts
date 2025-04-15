import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class FailedCreateUser {
    @ApiProperty()
    @IsString()
    trx_id: string;
}