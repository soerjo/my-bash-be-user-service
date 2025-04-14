import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { RoleEnum } from "../../../common/constant/role.constant";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { Transform, Type } from "class-transformer";

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
    @Type(() => Number)
    @IsEnum(RoleEnum)
    role_id?: RoleEnum;

    @IsOptional()
    @IsNumber({}, { each: true })
    @Transform(({ value }) =>
        Array.isArray(value)
          ? value.map((v) => Number(v))
          : [Number(value)],
      )
    @ApiPropertyOptional({ type: [Number] })
    ids?: number[];
}