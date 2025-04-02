/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ description: 'name' })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ description: 'institutionId' })
  @IsNumber()
  @IsNotEmpty({ message: 'Institution ID is required' })
  institutionId: number;
}
