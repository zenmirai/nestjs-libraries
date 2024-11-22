import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FlipTestModule } from './flip-test/flip-test.module';
import { StorageTestModule } from './storage-test/storage-test.module';

@Module({
  imports: [
    FlipTestModule,
    StorageTestModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
