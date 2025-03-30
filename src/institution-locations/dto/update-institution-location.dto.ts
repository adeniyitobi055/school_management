/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateInstitutionLocationDto } from './create-institution-location.dto';

export class UpdateInstitutionLocationDto extends PartialType(
  CreateInstitutionLocationDto,
) {}
