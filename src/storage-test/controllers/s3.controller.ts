import { Controller, Get, Param } from "@nestjs/common";
import { InjectDisk } from "@zenmirai/nest-storage";
import { StorageService } from "@zenmirai/nest-storage/storage.service";

@Controller('s3-storage-test')
export class S3StorageTestController {
  constructor(
    @InjectDisk('EXAMPLE_S3_DISK')
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