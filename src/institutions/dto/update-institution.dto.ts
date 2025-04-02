/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateInstitutionDto } from './create-institution.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateInstitutionDto extends PartialType(CreateInstitutionDto) {
  @ApiProperty({ description: 'name', required: false })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'email', required: false })
  email?: string;

  @ApiProperty({ description: 'phone', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'address', required: false })
  address?: string;

  @ApiProperty({ description: 'headOfInstitution', required: false })
  headOfInstitution?: string;

  @ApiProperty({ description: 'website', required: false })
  @IsString()
  website?: string;
}
