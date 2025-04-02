/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
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

export class CreateUserDto {
  @ApiProperty({ description: 'email' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ description: 'fullName' })
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'staffId' })
  @IsNotEmpty({ message: 'Staff ID is required' })
  @IsString()
  staffId: string;

  @ApiProperty({ description: 'department' })
  @IsNotEmpty({ message: 'Department is required' })
  @IsString()
  department: string;

  @ApiProperty({ description: 'phone' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'role' })
  @IsNotEmpty({ message: 'Role is required' })
  @IsEnum(['TEACHER', 'SUBSTITUTE'], {
    message: 'Role must be TEACHER or SUBSTITUTE',
  })
  role: 'TEACHER' | 'SUBSTITUTE';

  @ApiProperty({ description: 'password' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @ApiProperty({ description: 'subjects' })
  @IsArray({ message: 'Subject must be an array of IDs' })
  @ArrayNotEmpty({ message: 'At least one subject is required' })
  @IsNotEmpty({ each: true })
  subjects: (number | string)[];
}
