/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Code is required' })
  @IsString()
  code: string;

  @IsNotEmpty({ message: 'Department is required' })
  @IsString()
  department: string;

  @IsNotEmpty({ message: 'Unit is required for the course' })
  @IsNumber()
  unit: number;

  @IsOptional()
  @IsArray()
  users?: number[];
}
