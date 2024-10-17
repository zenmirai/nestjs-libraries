import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { FLIP_DECORATOR_PREFIX } from './constant/flip.constant';
import { FlipService } from './flip.service';
import {
  DiskAsyncOptions,
  DiskModuleOptionsFactory,
  FlipOptionContract,
} from './interface/flip-disk.interface';
import { FlipCallbackTokenValidator } from './validator/flip-callback-token.validator';

@Module({})
export class FlipModule {
  /**
   * Register new flip disk with async options
   *
   * @param options {DiskAsyncOptions}
   * @returns {DynamicModule}
   */
  static registerAsync(options: DiskAsyncOptions): DynamicModule {
    /**
     * @provider
     * Creating a provider based on FlipService that injected by options.name
     */
    const flipServiceProvider: Provider = {
      provide: FlipService,
      useFactory: async (options: FlipOptionContract) => {
        return new FlipService(options);
      },
      inject: [`${FLIP_DECORATOR_PREFIX}${options.name}`],
    };

    const callbackValidatorProvider: Provider = {
      provide: FlipCallbackTokenValidator,
      useFactory: (flipService: FlipService) => {
        return new FlipCallbackTokenValidator(flipService);
      },
      inject: [FlipService],
    };

    return {
      global: options.global ?? false,
      imports: [...(options.imports ?? [])],
      module: FlipModule,
      providers: [
        this.createFlipOptionsProvider(options),
        flipServiceProvider,
        callbackValidatorProvider,
      ],
      exports: [flipServiceProvider, FlipCallbackTokenValidator],
    };
  }

  /**
   * Create provider for flip options
   *
   * @param options {DiskAsyncOptions}
   * @returns {Provider}
   */
  private static createFlipOptionsProvider(
    options: DiskAsyncOptions,
  ): Provider {
    /**
     * @if options.useFactory
     * Create a provider using useFactory that passed dynamically
     */
    if (options.useFactory) {
      return {
        provide: `${FLIP_DECORATOR_PREFIX}${options.name}`,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    /**
     * @if options.useClass || options.useExisting
     * Create a provider using useClass or useExisting that passed dynamically
     */
    if (options.useClass || options.useExisting) {
      const inject = [
        (options.useClass ||
          options.useExisting) as Type<DiskModuleOptionsFactory>,
      ];

      return {
        provide: `${FLIP_DECORATOR_PREFIX}${options.name}`,
        useFactory: async (optionsFactory: DiskModuleOptionsFactory) =>
          optionsFactory.createOptions(),
        inject,
      };
    }
  }
}
