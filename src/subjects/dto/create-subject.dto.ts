/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ description: 'name' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'code' })
  @IsNotEmpty({ message: 'Code is required' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'department' })
  @IsNotEmpty({ message: 'Department is required' })
  @IsString()
  department: string;

  @ApiProperty({ description: 'unit' })
  @IsNotEmpty({ message: 'Unit is required for the course' })
  @IsNumber()
  unit: number;

  @ApiProperty({ description: 'users' })
  @IsOptional()
  @IsArray()
  users?: number[];
}
