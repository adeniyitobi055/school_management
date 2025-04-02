/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectDto } from './create-subject.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
  @ApiProperty({ description: 'name', required: false })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'code', required: false })
  @IsNotEmpty({ message: 'Code is required' })
  @IsString()
  code?: string;

  @ApiProperty({ description: 'department', required: false })
  @IsNotEmpty({ message: 'Department is required' })
  @IsString()
  department?: string;

  @ApiProperty({ description: 'unit', required: false })
  @IsNotEmpty({ message: 'Unit is required for the course' })
  @IsNumber()
  unit?: number;

  @ApiProperty({ description: 'users', required: false })
  @IsOptional()
  @IsArray()
  users?: number[];
}
