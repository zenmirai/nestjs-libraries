import { Module } from '@nestjs/common';
import { LocalStorageTestController } from './controllers/local.controller';
import { StorageModule } from '@zenmirai/nest-storage';
import { S3StorageTestController } from './controllers/s3.controller';

@Module({
  imports: [
    StorageModule.registerAsync({
      name: 'EXAMPLE_S3_DISK',
      useFactory() {
        return {
          type: 's3',
          bucket: '',
          key: "",
          secret: "",
          region: "ap-southeast-3",
          expiredTime: 30,
          path: '/test_s3',
        };
      },
    }),

    StorageModule.registerAsync({
      name: 'EXAMPLE_LOCAL',
      useFactory() {
        return {
          type: 'local',
          path: './tmp/disk_local_example'
        };
      },
    }),
  ],
  controllers: [
    LocalStorageTestController,
    S3StorageTestController
  ],
})
export class StorageTestModule {}
