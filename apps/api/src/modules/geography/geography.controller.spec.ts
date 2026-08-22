import { Test, TestingModule } from '@nestjs/testing';
import { GeographyController } from './geography.controller';
import { GeographyService } from './geography.service';

describe('GeographyController', () => {
  let controller: GeographyController;
  const geographyService = {
    findAllRegions: jest.fn(),
    findRegion: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeographyController],
      providers: [
        {
          provide: GeographyService,
          useValue: geographyService,
        },
      ],
    }).compile();

    controller = module.get<GeographyController>(GeographyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates the region list to the service', async () => {
    const regions = [{ id: 'sicilia' }];
    geographyService.findAllRegions.mockResolvedValue(regions);

    await expect(controller.findAllRegions()).resolves.toBe(regions);
    expect(geographyService.findAllRegions).toHaveBeenCalledTimes(1);
  });

  it('delegates a region identifier to the service', async () => {
    const region = { id: 'sicilia' };
    geographyService.findRegion.mockResolvedValue(region);

    await expect(controller.findRegion('sicilia')).resolves.toBe(region);
    expect(geographyService.findRegion).toHaveBeenCalledWith('sicilia');
  });
});
