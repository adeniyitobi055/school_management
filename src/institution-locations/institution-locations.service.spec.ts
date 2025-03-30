import { Test, TestingModule } from '@nestjs/testing';
import { InstitutionLocationsService } from './institution-locations.service';

describe('InstitutionLocationsService', () => {
  let service: InstitutionLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstitutionLocationsService],
    }).compile();

    service = module.get<InstitutionLocationsService>(InstitutionLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
