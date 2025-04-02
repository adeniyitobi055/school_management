import { Module } from '@nestjs/common';
import { InstitutionLocationsService } from './institution-locations.service';
import { InstitutionLocationsController } from './institution-locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionLocation } from './entities/institution-location.entity';
import { Institution } from 'src/institutions/entities/institution.entity';
import { InstitutionsModule } from 'src/institutions/institutions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstitutionLocation, Institution]),
    InstitutionsModule,
  ],
  providers: [InstitutionLocationsService],
  controllers: [InstitutionLocationsController],
})
export class InstitutionLocationsModule {}
