import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, Length, MaxLength } from "class-validator";

export class CreateEmailDto {
    @ApiProperty()
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty()
    @IsString()
    html: string;

    @ApiProperty()
    @IsString()
    @MaxLength(100)
    description: string;

    @ApiProperty()
    @IsString()
    @MaxLength(100)
    subject: string;

    @ApiProperty()
    @IsArray()
    @IsNumber({}, { each: true })
    @Type(() => Number)
    @Length(1)
    attachment_ids: number[];
}
