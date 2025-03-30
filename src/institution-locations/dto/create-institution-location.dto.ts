/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInstitutionLocationDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString()
  address: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString()
  city: string;

  @IsNotEmpty({ message: 'State is not empty' })
  @IsString()
  state: string;

  @IsNotEmpty({ message: 'Country is required' })
  @IsString()
  country: string;

  @IsNotEmpty()
  institutionId: number;
}
