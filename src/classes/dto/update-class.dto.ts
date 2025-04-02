/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create-class.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateClassDto extends PartialType(CreateClassDto) {
  @ApiProperty({ description: 'name', required: false })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'institutionId', required: false })
  @IsNumber()
  institutionId?: number;
}
