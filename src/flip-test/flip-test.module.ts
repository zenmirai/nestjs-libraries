import { Module } from '@nestjs/common';
import { FlipModule } from '@zenmirai/nest-flip';
import { FlipTestCallbackModule } from './flip-test-callback/flip-test-callback.module';
import { FlipTestController } from './flip-test.controller';

@Module({
  imports: [
    FlipTestCallbackModule,
    FlipModule.registerAsync({
      global: false,
      provide: FlipModule,
      async useFactory() {
        return {
          type: 'flip',
          secret:
            'JDJ5JDEzJHIzZE56U0xxNDdOMXNXRklPZHAucWVJeVRwVHZvdW1qMmh2dnRqcTNMOXNVSGRqVEpsNE1x',
          validationToken:
            '$2y$13$FXxsq6q0kKt8egai3t4I/..QiH8QELO9TeqSc3I2UdhAU6kSQ6ArC',
        };
      },
    }),
  ],
  controllers: [FlipTestController],
})
export class FlipTestModule {}
