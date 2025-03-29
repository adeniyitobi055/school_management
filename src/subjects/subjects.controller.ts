/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('subjects')
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
  async findOne(@Param('identifier') identifier: string) {
    const id = parseInt(identifier, 10);
    return isNaN(id)
      ? this.subjectsService.findOne(identifier)
      : this.subjectsService.findOne(id);
  }

  @Patch(':identifier')
  async update(
    @Param('identifier') identifier: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    const id = parseInt(identifier, 10);
    return isNaN(id)
      ? this.subjectsService.update(identifier, updateSubjectDto)
      : this.subjectsService.update(id, updateSubjectDto);
  }

  @Delete(':identifier')
  async remove(@Param('identifier') identifier: string) {
    const id = parseInt(identifier, 10);
    return isNaN(id)
      ? this.subjectsService.remove(identifier)
      : this.subjectsService.remove(id);
  }
}
