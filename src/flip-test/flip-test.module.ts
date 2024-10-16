import { Module } from '@nestjs/common';
import { FlipModule } from 'flip/flip';

@Module({
  imports: [
    FlipModule
  ]
})
export class FlipTestModule {}
