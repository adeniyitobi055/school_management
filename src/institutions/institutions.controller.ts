/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('institutions')
@UseGuards(JwtAuthGuard)
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Post()
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionsService.create(createInstitutionDto);
  }

  @Get()
  findAll() {
    return this.institutionsService.findAll();
  }

  @Get(':identifier')
  findOne(@Param('identifier', ParseIntPipe) identifier: string) {
    return this.institutionsService.findOne(
      isNaN(+identifier) ? identifier : +identifier,
    );
  }

  @Patch(':identifier')
  update(
    @Param('identifier', ParseIntPipe) identifier: string,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ) {
    return this.institutionsService.update(
      isNaN(+identifier) ? identifier : +identifier,
      updateInstitutionDto,
    );
  }

  @Delete(':identifier')
  delete(@Param('identifier', ParseIntPipe) identifier: string) {
    return this.institutionsService.delete(
      isNaN(+identifier) ? identifier : +identifier,
    );
  }
}
