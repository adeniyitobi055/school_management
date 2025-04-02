/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInstitutionDto {
  @ApiProperty({ description: 'name' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ description: 'phone' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'address' })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @ApiProperty({ description: 'headOfInstitution' })
  @IsNotEmpty({ message: 'Head of institution is required' })
  headOfInstitution: string;

  @ApiProperty({ description: 'website' })
  @IsNotEmpty()
  @IsString()
  website: string;
}
