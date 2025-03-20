import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  phone?: string;

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
}
