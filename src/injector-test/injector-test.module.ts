import { Module } from '@nestjs/common';
import { InjectorTestService } from './injector-test.service';

@Module({
  providers: [InjectorTestService],
  exports: [InjectorTestService]
})
export class InjectorTestModule {}
