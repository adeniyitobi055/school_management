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
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('subjects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  async findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':identifier')
  async findOne(@Param('identifier', ParseIntPipe) identifier: string) {
    return this.subjectsService.findOne(
      isNaN(+identifier) ? identifier : +identifier,
    );
  }

  @Patch(':identifier')
  async update(
    @Param('identifier', ParseIntPipe) identifier: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectsService.update(
      isNaN(+identifier) ? identifier : +identifier,
      updateSubjectDto,
    );
  }

  @Delete(':identifier')
  async remove(@Param('identifier') identifier: string) {
    return this.subjectsService.remove(
      isNaN(+identifier) ? identifier : +identifier,
    );
  }
}
