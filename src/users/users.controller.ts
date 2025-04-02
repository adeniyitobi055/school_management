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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':identifier')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('identifier', ParseIntPipe) identifier: string) {
    return this.usersService.findOne(
      isNaN(+identifier) ? identifier : +identifier,
    );
  }

  @Patch(':identifier')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('identifier', ParseIntPipe) identifier: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(
      isNaN(+identifier) ? identifier : +identifier,
      updateUserDto,
    );
  }

  @Delete(':identifier')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('identifier', ParseIntPipe) identifier: string) {
    return this.usersService.deleteUser(
      isNaN(+identifier) ? identifier : +identifier,
    );
  }
}
