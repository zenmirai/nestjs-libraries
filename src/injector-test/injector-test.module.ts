import { Module } from '@nestjs/common';
import { StorageModule } from '@zenmirai/storage';
import { InjectorTestontroller } from './injector-test.controller';
import { InjectorTestService } from './injector-test.service';

@Module({
  imports: [
    StorageModule.registerAsync({
      name: `EXAMPLE_LOCAL_DISK`,
      useFactory(config: any) {
        return {
          type: 'local',
          path: '/test_local',
        };
      },
    }),
  ],
  controllers: [InjectorTestontroller],
  providers: [InjectorTestService],
  exports: [InjectorTestService],
})
export class InjectorTestModule {}
