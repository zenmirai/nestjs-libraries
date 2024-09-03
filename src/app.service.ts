import { Injectable } from '@nestjs/common';
import { StorageService } from '@zenmirai/storage/storage.service';

@Injectable()
export class AppService {
  constructor(private disk: StorageService) {}

  getHello(): string {
    this.disk.save(Buffer.from('abc'), 'abc.txt');

    return 'saved';
  }
  async load(fileName: string) {
    return await this.disk.load(fileName);
  }

  async getSignUrl(fileName: string) {
    return await this.disk.getSignerUrl(fileName);
  }
}
