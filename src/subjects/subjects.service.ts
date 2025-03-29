/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { In, Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const { users, ...subjectData } = createSubjectDto;

    const subject = this.subjectRepository.create(subjectData);
    if (users && users.length > 0) {
      const foundUsers = await this.userRepository.findBy({ id: In(users) });
      subject.users = foundUsers;
    }
    return this.subjectRepository.save(subject);
  }

  async findAll() {
    return this.subjectRepository.find();
  }

  async findOne(subjectIdentifiers: number | string) {
    let subject: Subject | null = null;

    if (typeof subjectIdentifiers === 'number') {
      subject = await this.subjectRepository.findOne({
        where: { id: subjectIdentifiers },
      });
    } else {
      subject = await this.subjectRepository.findOne({
        where: { code: subjectIdentifiers },
      });
    }

    if (!subject) {
      throw new NotFoundException(
        `Subject with identifier ${subjectIdentifiers} not found`,
      );
    }
    return subject;
  }

  async update(
    identifier: number | string,
    updateSubjectDto: UpdateSubjectDto,
  ) {
    const subject = await this.findOne(identifier);

    Object.assign(subject, updateSubjectDto);

    return this.subjectRepository.save(subject);
  }

  async remove(identifier: number | string) {
    const subject = await this.findOne(identifier);

    return this.subjectRepository.remove(subject);
  }
}
