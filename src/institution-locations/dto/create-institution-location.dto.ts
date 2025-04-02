/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInstitutionLocationDto {
  @ApiProperty({ description: 'location name' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'address' })
  @IsNotEmpty({ message: 'Address is required' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'city' })
  @IsNotEmpty({ message: 'City is required' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'state' })
  @IsNotEmpty({ message: 'State is not empty' })
  @IsString()
  state: string;

  @ApiProperty({ description: 'country' })
  @IsNotEmpty({ message: 'Country is required' })
  @IsString()
  country: string;

  @ApiProperty({ description: 'institutionId' })
  @IsNotEmpty({ message: 'Institution ID is required' })
  @IsNumber()
  institutionId: number;

  @ApiProperty({ description: 'latitude' })
  @IsNotEmpty({ message: 'Latitude is required' })
  @IsNumber()
  @Transform(({ value }) => parseFloat(value as string).toFixed(6))
  latitude: number;

  @ApiProperty({ description: 'longitude' })
  @IsNotEmpty({ message: 'Longitude is required' })
  @IsNumber()
  @Transform(({ value }) => parseFloat(value as string).toFixed(6))
  longitude: number;
}
