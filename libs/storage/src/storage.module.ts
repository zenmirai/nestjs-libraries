import {
  DynamicModule,
  Module,
  ModuleMetadata,
  Provider,
  Type,
} from '@nestjs/common';
import { LocalStorageAdapter } from './adapters/local-storage.adapter';
import { S3StorageAdapter } from './adapters/s3-storage.adapter';
import {
  STORAGE_DECORATOR_PREFIX,
  STORAGE_DEFAULT_PATH,
  STORAGE_DEFAULT_TYPE,
} from './storage.constant';
import {
  DiskAsyncOptions,
  DiskModuleOptionsFactory,
  DiskOptions,
  StorageOptionContract,
} from './storage.interface';
import { StorageService } from './storage.service';

@Module({})
export class StorageModule {
  /**
   * Register new storage disk with async options
   *
   * @param options {DiskAsyncOptions}
   * @returns {DynamicModule}
   */
  static registerAsync(options: DiskAsyncOptions): DynamicModule {
    /**
     * @provider
     * Creating a provider based on StorageService that injected by options.name
     */
    const provider: Provider = {
      provide: `${STORAGE_DECORATOR_PREFIX}${options.name}`,
      useFactory: async (options: StorageOptionContract) => {
        if (options.type == 'local') {
          const adapter = new LocalStorageAdapter({ root: options.path });
          return new StorageService(adapter);
        } else if (options.type === 's3') {
          const adapter = new S3StorageAdapter(options);
          return new StorageService(adapter);
        }

        throw Error("can't factory drive")
      },
      inject: [`${STORAGE_DECORATOR_PREFIX}_CONFIG`],
    };

    return {
      imports: [...(options.imports ?? [])],
      module: StorageModule,
      providers: [this.createStorageOptionsProvider(options), provider],
      exports: [provider],
    };
  }

  /**
   * Create provider for storage options
   *
   * @param options {DiskAsyncOptions}
   * @returns {Provider}
   */
  private static createStorageOptionsProvider(
    options: DiskAsyncOptions,
  ): Provider {
    /**
     * @if options.useFactory
     * Create a provider using useFactory that passed dynamically
     */
    if (options.useFactory) {
      return {
        provide: `${STORAGE_DECORATOR_PREFIX}_CONFIG`,
        inject: options.inject || [],
        useFactory: options.useFactory,
      };
    }

    /**
     * Default configuration
     */
    return {
      provide: `${STORAGE_DECORATOR_PREFIX}_CONFIG`,
      useValue: {
        type: STORAGE_DEFAULT_TYPE,
        path: STORAGE_DEFAULT_PATH,
      }
    };
  }
}
