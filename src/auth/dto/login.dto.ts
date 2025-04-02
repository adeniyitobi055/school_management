/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'email' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ description: 'password' })
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
