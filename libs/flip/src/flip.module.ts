import { DynamicModule, Module, Provider } from '@nestjs/common';
import { FLIP_CONFIG_OPTION_TOKEN } from './constant/flip.constant';
import { FlipService } from './flip.service';
import { FlipAsyncOptions as FlipOptionsContract } from './interface/flip-disk.interface';

@Module({
  providers: [FlipService],
  exports: [FlipService],
})
export class FlipModule {
  /**
   * Register new flip disk with async options
   *
   */
  static registerAsync(options: FlipOptionsContract): DynamicModule {
    const importedModules = options.imports ?? [];

    const flipConfigProvider: Provider =
      this.createFlipOptionsProvider(options);

    return {
      module: FlipModule,
      global: options.global ?? false,
      imports: importedModules,
      providers: [flipConfigProvider],
    };
  }

  /**
   * Create provider for flip options
   *
   */
  private static createFlipOptionsProvider(
    options: FlipOptionsContract,
  ): Provider {
    return {
      provide: FLIP_CONFIG_OPTION_TOKEN,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
