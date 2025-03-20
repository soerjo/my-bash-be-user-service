import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterBankDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string; 
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

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