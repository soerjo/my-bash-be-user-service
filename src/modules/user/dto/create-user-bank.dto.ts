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

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    bank_id?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    warehouse_id?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(RoleEnum)
    role_id?: RoleEnum;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    trx_id?: string;

}