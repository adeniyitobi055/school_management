/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'email', required: false })
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @ApiProperty({ description: 'fullName', required: false })
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString()
  fullName?: string;

  @ApiProperty({ description: 'staffId', required: false })
  @IsNotEmpty({ message: 'Staff ID is required' })
  @IsString()
  staffId?: string;

  @ApiProperty({ description: 'department', required: false })
  @IsNotEmpty({ message: 'Department is required' })
  @IsString()
  department?: string;

  @ApiProperty({ description: 'phone', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'role', required: false })
  @IsNotEmpty({ message: 'Role is required' })
  @IsEnum(['TEACHER', 'SUBSTITUTE'], {
    message: 'Role must be TEACHER or SUBSTITUTE',
  })
  role?: 'TEACHER' | 'SUBSTITUTE';

  @ApiProperty({ description: 'password', required: false })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string;

  @ApiProperty({ description: 'subjects', required: false })
  @IsArray({ message: 'Subject must be an array of IDs' })
  @ArrayNotEmpty({ message: 'At least one subject is required' })
  @IsNotEmpty({ each: true })
  subjects?: (number | string)[];
}
