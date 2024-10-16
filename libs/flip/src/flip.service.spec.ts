import { Test, TestingModule } from '@nestjs/testing';
import { FlipService } from './flip.service';

describe('FlipService', () => {
  let service: FlipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlipService],
    }).compile();

    service = module.get<FlipService>(FlipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
