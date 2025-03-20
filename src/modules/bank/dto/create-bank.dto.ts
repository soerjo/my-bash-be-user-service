import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBankDto {
    owner_id: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;    

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    province: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    regency: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    district: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    village: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    address: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    postal_code: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    phone: string;
}
