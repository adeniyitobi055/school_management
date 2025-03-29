/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { subjects, password, ...userData } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const subjectEntities = await this.subjectRepository.findBy({
      id: In(subjects),
    });

    if (subjectEntities.length === 0) {
      throw new NotFoundException('No valid subjects found');
    }

    console.log('Subjects retrieved:', subjectEntities);

    const user = this.usersRepository.create({
      ...userData,
      subjects: subjectEntities,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);

    return this.findOne(savedUser.id);
  }

  async findAllUsers() {
    return this.usersRepository.find();
  }

  async findByEmailOrStaffId(identifier: string) {
    return this.usersRepository.findOne({
      where: [{ email: identifier }, { staffId: identifier }],
    });
  }

  async findOne(identifier: number | string) {
    let user: User | null = null;
    if (typeof identifier === 'number') {
      user = await this.usersRepository.findOne({
        where: { id: identifier },
        relations: ['subjects'],
      });
    } else if (typeof identifier === 'string') {
      user = await this.usersRepository.findOne({
        where: { staffId: identifier },
        relations: ['subjects'],
      });
    }

    if (!user) {
      throw new NotFoundException(`User with ID ${identifier} not found`);
    }

    return user;
  }

  async updateUser(identifier: number | string, updateUserDto: UpdateUserDto) {
    const exisitingUser = await this.findOne(identifier);

    if (!exisitingUser) {
      throw new NotFoundException(
        `User not found with identifier ${identifier}`,
      );
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    let subjects: Subject[] = [];
    // If subjects is not provided in the update data
    if (updateUserDto.subjects && updateUserDto.subjects.length > 0) {
      const subjectIdentifiers = updateUserDto.subjects;

      subjects = await this.subjectRepository.find({
        where: [
          { id: In(subjectIdentifiers.filter((id) => typeof id === 'number')) },
          {
            code: In(
              subjectIdentifiers.filter((code) => typeof code === 'string'),
            ),
          },
        ],
      });
    }

    // Using preload to correctly merge updates
    const updatedUser = await this.usersRepository.preload({
      id: exisitingUser.id,
      ...updateUserDto,
      subjects,
    });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${exisitingUser.id} not found`);
    }

    await this.usersRepository.save(updatedUser);
    return updatedUser;
  }

  async deleteUser(identifier: number | string) {
    const user = await this.findOne(identifier);
    if (!user) {
      throw new NotFoundException(
        `User not found with identifier: ${identifier}`,
      );
    }
    await this.usersRepository.softRemove(user);

    return { message: `User with ID ${identifier} deleted successfully` };
  }
}
