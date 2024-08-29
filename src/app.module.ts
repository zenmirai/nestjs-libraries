import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from '@zenmirai/storage';
import { InjectorTestModule } from './injector-test/injector-test.module';
import { InjectorTestService } from './injector-test/injector-test.service';

@Module({
  imports: [
    StorageModule.register({
      name: "EXAMPLE_DISK",
    }),

    StorageModule.registerAsync()
    
    InjectorTestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
