import { Controller, Get, Param } from '@nestjs/common';
import { InjectDisk } from '@zenmirai/nest-storage';
import { StorageService } from '@zenmirai/nest-storage/storage.service';

@Controller('local-storage-test')
export class LocalStorageTestController {
  constructor(
    @InjectDisk('EXAMPLE_LOCAL')
    private readonly localDisk: StorageService
  ) { }

  @Get('/save')
  save() {
    return this.localDisk.save(Buffer.from("test"), "test.txt");
  }

  @Get('/load/:fileName')
  load(@Param('fileName') fileName: string) {
    return this.localDisk.load(fileName);
  }

  @Get('/url/:fileName')
  getUrl(@Param('fileName') fileName: string) {
    return this.localDisk.getSignedUrl(fileName);
  }
}
