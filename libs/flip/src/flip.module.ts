import { Module } from '@nestjs/common';
import { FlipService } from './flip.service';

@Module({
  providers: [FlipService],
  exports: [FlipService],
})
export class FlipModule {}
