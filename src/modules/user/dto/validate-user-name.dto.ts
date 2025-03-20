import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class ValidateUserNameDto {
    @ApiPropertyOptional()
    @Type(() => Boolean)
    @IsBoolean()
    @IsOptional()
    is_admin?: boolean;
}