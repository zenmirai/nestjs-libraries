import { Module } from '@nestjs/common';
import { FlipModule } from 'flip/flip';
import { FlipTestController } from './flip-test.controller';
import { FlipTestService } from './flip-test.service';
import { FlipTestCallbackModule } from './flip-test-callback/flip-test-callback.module';

@Module({
  imports: [
    FlipTestCallbackModule,
    FlipModule.registerAsync({
      global: true,
      name: 'branch-payment',
      async useFactory() {
        return {
          type: 'flip',
          secret: 'JDJ5JDEzJHIzZE56U0xxNDdOMXNXRklPZHAucWVJeVRwVHZvdW1qMmh2dnRqcTNMOXNVSGRqVEpsNE1x',
          validationToken: '$2y$13$FXxsq6q0kKt8egai3t4I/..QiH8QELO9TeqSc3I2UdhAU6kSQ6ArC',
        };
      },
    }),
    FlipTestCallbackModule,
  ],
  controllers: [FlipTestController],
  providers: [FlipTestService],
})
export class FlipTestModule {}
