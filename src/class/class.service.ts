/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const newClass = this.classRepository.create(createClassDto);
    return await this.classRepository.save(newClass);
  }

  async findAll() {
    return await this.classRepository.find({ relations: ['institution'] });
  }

  async findOne(identifier: string | number) {
    let existingClass: Class | null = null;
    if (typeof identifier === 'string') {
      existingClass = await this.classRepository.findOne({
        where: { name: identifier },
        relations: ['institution'],
      });
    } else if (typeof identifier === 'number') {
      existingClass = await this.classRepository.findOne({
        where: { id: identifier },
        relations: ['institution'],
      });
    }

    if (!existingClass) {
      throw new NotFoundException(
        `Class with identifier ${identifier} not found`,
      );
    }

    return existingClass;
  }

  async update(identifer: string | number, updateClassDto: UpdateClassDto) {
    const cls = await this.findOne(identifer);
    Object.assign(cls, updateClassDto);
    return await this.classRepository.save(cls);
  }

  async delete(identifer: string | number) {
    const cls = await this.findOne(identifer);
    await this.classRepository.delete(cls);
  }
}
