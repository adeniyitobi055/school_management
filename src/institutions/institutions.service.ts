/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { Repository } from 'typeorm';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private institutionRepository: Repository<Institution>,
  ) {}

  async create(createInstitutionDto: CreateInstitutionDto) {
    const institution = this.institutionRepository.create(createInstitutionDto);
    return await this.institutionRepository.save(institution);
  }

  async findAll() {
    return await this.institutionRepository.find({ relations: ['locations'] });
  }

  async findOne(identifier: string | number) {
    let institution: Institution | null = null;
    if (typeof identifier === 'number') {
      institution = await this.institutionRepository.findOne({
        where: { id: identifier },
        relations: ['locations'],
      });
    } else if (typeof identifier === 'string') {
      institution = await this.institutionRepository.findOne({
        where: { name: identifier },
        relations: ['locations'],
      });
    }

    if (!institution) {
      throw new NotFoundException('Institution not found');
    }

    return institution;
  }

  async update(
    identifier: string | number,
    updateInstitutionDto: UpdateInstitutionDto,
  ) {
    const institution = await this.findOne(identifier);
    Object.assign(institution, updateInstitutionDto);
    return await this.institutionRepository.save(institution);
  }

  async delete(identifier: string | number) {
    const institution = await this.findOne(identifier);
    await this.institutionRepository.remove(institution);
  }
}
