import { Module } from '@nestjs/common';
import { FlipTestCallbackService } from './flip-test-callback.service';
import { FlipTestCallbackController } from './flip-test-callback.controller';

@Module({
  controllers: [FlipTestCallbackController],
  providers: [FlipTestCallbackService],
})
export class FlipTestCallbackModule {}
