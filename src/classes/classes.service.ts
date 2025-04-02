/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classes } from './entities/classes.entity';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Institution } from 'src/institutions/entities/institution.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classes)
    private readonly classRepository: Repository<Classes>,

    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const institution = await this.institutionRepository.findOne({
      where: { id: createClassDto.institutionId },
    });

    if (!institution) {
      throw new NotFoundException('Institution not found');
    }

    const newClass = this.classRepository.create({
      ...createClassDto,
      institution,
    });
    return await this.classRepository.save(newClass);
  }

  async findAll() {
    return await this.classRepository.find({ relations: ['institution'] });
  }

  async findOne(identifier: string | number) {
    let existingClass: Classes | null = null;
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
    await this.classRepository.delete(cls.id);
  }
}
