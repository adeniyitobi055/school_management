/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateInstitutionLocationDto } from './create-institution-location.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateInstitutionLocationDto extends PartialType(
  CreateInstitutionLocationDto,
) {
  @ApiProperty({ description: 'location name', required: false })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'address', required: false })
  @IsString()
  address?: string;

  @ApiProperty({ description: 'city', required: false })
  @IsString()
  city?: string;

  @ApiProperty({ description: 'state', required: false })
  @IsString()
  state?: string;

  @ApiProperty({ description: 'country', required: false })
  @IsString()
  country?: string;

  @ApiProperty({ description: 'institutionId', required: false })
  @IsNotEmpty({ message: 'Institution ID is required' })
  @IsNumber()
  institutionId?: number;

  @ApiProperty({ description: 'latitude', required: false })
  @IsNumber()
  @Transform(({ value }) => parseFloat(value as string).toFixed(6))
  latitude?: number;

  @ApiProperty({ description: 'longitude', required: false })
  @IsNumber()
  @Transform(({ value }) => parseFloat(value as string).toFixed(6))
  longitude?: number;
}
