import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { GeographyService } from './geography.service';

describe('GeographyService', () => {
  let service: GeographyService;
  const prisma = {
    region: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeographyService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<GeographyService>(GeographyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns regions ordered by name', async () => {
    const regions = [{ id: 'sicilia', name: 'Sicilia' }];
    prisma.region.findMany.mockResolvedValue(regions);

    await expect(service.findAllRegions()).resolves.toBe(regions);
    expect(prisma.region.findMany).toHaveBeenCalledWith({
      orderBy: { name: 'asc' },
    });
  });

  it('returns a region with its provinces', async () => {
    const region = { id: 'sicilia', provinces: [] };
    prisma.region.findUnique.mockResolvedValue(region);

    await expect(service.findRegion('sicilia')).resolves.toBe(region);
    expect(prisma.region.findUnique).toHaveBeenCalledWith({
      where: { id: 'sicilia' },
      include: { provinces: true },
    });
  });
});
