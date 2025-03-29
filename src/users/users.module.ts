import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { Subject } from 'src/subjects/entities/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Subject]),
    forwardRef(() => SubjectsModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
