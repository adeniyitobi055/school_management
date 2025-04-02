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
import { InstitutionLocationsService } from './institution-locations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateInstitutionLocationDto } from './dto/create-institution-location.dto';
import { UpdateInstitutionLocationDto } from './dto/update-institution-location.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('institution-locations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class InstitutionLocationsController {
  constructor(private readonly locationsService: InstitutionLocationsService) {}

  @Post()
  create(@Body() createLocationDto: CreateInstitutionLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':identifier')
  findOne(@Param('identifier', ParseIntPipe) identifier: string) {
    return this.locationsService.findOne(
      isNaN(+identifier) ? identifier : +identifier,
    );
  }

  @Patch(':identifier')
  update(
    @Param('identifier', ParseIntPipe) identifier: string,
    @Body() updateLocationDto: UpdateInstitutionLocationDto,
  ) {
    return this.locationsService.update(
      isNaN(+identifier) ? identifier : +identifier,
      updateLocationDto,
    );
  }

  @Delete(':identifier')
  delete(@Param('identifier', ParseIntPipe) identifier: string) {
    return this.locationsService.delete(
      isNaN(+identifier) ? identifier : +identifier,
    );
  }
}
