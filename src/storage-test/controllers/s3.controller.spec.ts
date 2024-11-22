import { Test, TestingModule } from '@nestjs/testing';
import { LocalStorageTestController } from './local.controller';

describe('StorageTestController', () => {
  let controller: LocalStorageTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalStorageTestController],
    }).compile();

    controller = module.get<LocalStorageTestController>(LocalStorageTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
