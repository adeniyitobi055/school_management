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
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('classes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.classesService.findAll();
  }

  @Get(':identifier')
  findOne(@Param('identifier', ParseIntPipe) identifier: string) {
    return this.classesService.findOne(
      isNaN(+identifier) ? identifier : +identifier,
    );
  }

  @Patch(':identifier')
  update(
    @Param('identifier', ParseIntPipe) identifier: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return this.classesService.update(
      isNaN(+identifier) ? identifier : +identifier,
      updateClassDto,
    );
  }

  @Delete(':identifier')
  delete(@Param('identifier', ParseIntPipe) identifier: string) {
    return this.classesService.delete(
      isNaN(+identifier) ? identifier : +identifier,
    );
  }
}
