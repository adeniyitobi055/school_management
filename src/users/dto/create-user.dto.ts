/* eslint-disable prettier/prettier */
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
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Full name is required' })
  @IsString()
  fullName: string;

  @IsNotEmpty({ message: 'Staff ID is required' })
  @IsString()
  staffId: string;

  @IsNotEmpty({ message: 'Department is required' })
  @IsString()
  department: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsEnum(['TEACHER', 'SUBSTITUTE'], {
    message: 'Role must be TEACHER or SUBSTITUTE',
  })
  role: 'TEACHER' | 'SUBSTITUTE';

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsArray({ message: 'Subject must be an array of IDs' })
  @ArrayNotEmpty({ message: 'At least one subject is required' })
  @IsNotEmpty({ each: true })
  subjects: (number | string)[];
}
