/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionLocation } from './entities/institution-location.entity';
import { Repository } from 'typeorm';
import { CreateInstitutionLocationDto } from './dto/create-institution-location.dto';
import { UpdateInstitutionLocationDto } from './dto/update-institution-location.dto';

@Injectable()
export class InstitutionLocationsService {
  constructor(
    @InjectRepository(InstitutionLocation)
    private readonly locationRepository: Repository<InstitutionLocation>,
  ) {}

  async create(createLocationDto: CreateInstitutionLocationDto) {
    const location = this.locationRepository.create(createLocationDto);
    return await this.locationRepository.save(location);
  }

  async findAll() {
    return await this.locationRepository.find({ relations: ['institution'] });
  }

  async findOne(identifier: string | number) {
    let location: InstitutionLocation | null = null;
    if (typeof identifier === 'string') {
      location = await this.locationRepository.findOne({
        where: { name: identifier },
        relations: ['institution'],
      });
    } else if (typeof identifier === 'number') {
      location = await this.locationRepository.findOne({
        where: { id: identifier },
        relations: ['institution'],
      });
    }

    if (!location) {
      throw new NotFoundException(
        `Institution location with identifier ${identifier} not found`,
      );
    }

    return location;
  }

  async update(
    identifier: string | number,
    updateInstitutionLocationDto: UpdateInstitutionLocationDto,
  ) {
    const location = await this.findOne(identifier);
    Object.assign(location, updateInstitutionLocationDto);
    return await this.locationRepository.save(location);
  }

  async delete(identifier: string | number) {
    const location = await this.findOne(identifier);
    await this.locationRepository.remove(location);
  }
}
