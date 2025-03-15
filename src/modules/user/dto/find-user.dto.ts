import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { RoleEnum } from "../../../common/constant/role.constant";
import { PaginationDto } from "../../../common/dto/pagination.dto";

export class FindUserDto extends PaginationDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    username?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    email?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(RoleEnum)
    role_id?: RoleEnum;
}