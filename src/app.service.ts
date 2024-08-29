import { Injectable } from '@nestjs/common';
import { StorageAdapterContract, InjectDisk } from '@zenmirai/storage';

@Injectable()
export class AppService {
  constructor(
    @InjectDisk("EXAMPLE_DISK") private disk: StorageAdapterContract,
  ) { }

  getHello(): string {
    this.disk.save(Buffer.from("abc"), "abc.txt");

    return "saved";
  }
}
