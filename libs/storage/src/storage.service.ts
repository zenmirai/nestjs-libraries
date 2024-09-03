import { Injectable } from '@nestjs/common';
import {
  StorageAdapterContract,
  StorageGetContract,
  StorageSaveContract,
} from './storage.interface';

@Injectable()
export class StorageService {
  constructor(private storage: StorageAdapterContract) {}

  async save(file: Buffer, fileName: string): Promise<StorageSaveContract> {
    return await this.storage.save(file, fileName);
  }

  async load(fileName: string): Promise<StorageGetContract> {
    return await this.storage.load(fileName);
  }

  async getSignerUrl(fileName: string): Promise<string> {
    return await this.storage.getSignUrl(fileName);
  }
}
