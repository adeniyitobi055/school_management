import { Test, TestingModule } from '@nestjs/testing';
import { InstitutionLocationsController } from './institution-locations.controller';

describe('InstitutionLocationsController', () => {
  let controller: InstitutionLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstitutionLocationsController],
    }).compile();

    controller = module.get<InstitutionLocationsController>(InstitutionLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
