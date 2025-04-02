import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classes } from './entities/classes.entity';
import { InstitutionsModule } from 'src/institutions/institutions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Classes]), InstitutionsModule],
  providers: [ClassesService],
  controllers: [ClassesController],
  exports: [ClassesService],
})
export class ClassModule {}
