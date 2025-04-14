import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RoleEnum } from "../../../common/constant/role.constant";

export class CreateUserBankDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @ApiProperty()
    @IsNumber()
    bank_id: number;

    @ApiProperty()
    @IsNumber()
    warehouse_id: number;


    @ApiProperty()
    @IsEnum(RoleEnum)
    role_id: RoleEnum;
}