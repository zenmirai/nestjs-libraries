import { Module } from '@nestjs/common';
import { StorageModule } from '../libs/storage/src/storage.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InjectorTestModule } from './injector-test/injector-test.module';
import { FlipTestModule } from './flip-test/flip-test.module';

@Module({
  imports: [
    StorageModule.registerAsync({
      name: `EXAMPLE_S3_DISK`,
      useFactory(config: any) {
        return {
          type: 's3',
          bucket: config?.bucket,
          key: config?.key,
          secret: config?.secret,
          region: config?.region,
          expiredTime: Number(config?.expiredTime),
          path: '/test_s3',
        };
      },
    }),
    InjectorTestModule,
    FlipTestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
