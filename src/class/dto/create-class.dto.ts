/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsInt()
  @IsNotEmpty({ message: 'Institution ID is required' })
  institutionId: number;
}
