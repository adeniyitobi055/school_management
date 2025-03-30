import { Module } from '@nestjs/common';
import { InstitutionLocationsService } from './institution-locations.service';
import { InstitutionLocationsController } from './institution-locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionLocation } from './entities/institution-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstitutionLocation])],
  providers: [InstitutionLocationsService],
  controllers: [InstitutionLocationsController],
})
export class InstitutionLocationsModule {}
