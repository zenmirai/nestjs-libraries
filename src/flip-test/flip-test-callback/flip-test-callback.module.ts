import { Module } from '@nestjs/common';
import { FlipModule } from '@zenmirai/nest-flip';
import { FlipTestCallbackController } from './flip-test-callback.controller';
import { FlipTestCallbackService } from './flip-test-callback.service';
import { FlipCallbackTokenValidator } from './validator/flip-callback-token.validator';

@Module({
  imports: [
    FlipModule.registerAsync({
      global: false,
      imports: [FlipTestCallbackModule],
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
  controllers: [FlipTestCallbackController],
  providers: [FlipTestCallbackService, FlipCallbackTokenValidator],
  exports: [FlipCallbackTokenValidator],
})
export class FlipTestCallbackModule {}
