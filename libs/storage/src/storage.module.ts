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
  static forRoot(options: {
    imports?: ModuleMetadata['imports'];
    inject?: ModuleMetadata['providers'];
  }): DynamicModule {
    return {
      module: StorageModule,
      ...options,
    };
  }

  /**
   * Register new storage disk
   *
   * @param options {DiskOptions}
   * @returns {DynamicModule}
   */
  static register(options: DiskOptions): DynamicModule {
    return {
      providers: [
        {
          provide: `${STORAGE_DECORATOR_PREFIX}${options.name}`,
          useFactory(...args) {
            if (options.adapter.type === 's3') {
              const adapter = new S3StorageAdapter(options.adapter);
              return new StorageService(adapter);
            }

            const adapter = new LocalStorageAdapter({
              root: options.name,
            });
            return new StorageService(adapter);
          },
        },
      ],
      exports: [`${STORAGE_DECORATOR_PREFIX}${options.name}`],
      module: StorageModule,
    };
  }

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
      provide: StorageService,
      useFactory: async (options: StorageOptionContract) => {
        if (options.type === 's3') {
          const adapter = new S3StorageAdapter(options);
          return new StorageService(adapter);
        }

        const adapter = new LocalStorageAdapter({ root: options.path });
        const storageService = new StorageService(adapter);
        return storageService;
      },
      inject: [`${STORAGE_DECORATOR_PREFIX}${options.name}`],
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
        provide: `${STORAGE_DECORATOR_PREFIX}${options.name}`,
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
        provide: `${STORAGE_DECORATOR_PREFIX}${options.name}`,
        useFactory: async (optionsFactory: DiskModuleOptionsFactory) =>
          optionsFactory.createOptions(),
        inject,
      };
    }

    /**
     * default provider
     * Create a provider by default settings
     */
    return {
      provide: `${STORAGE_DECORATOR_PREFIX}${options.name}`,
      useFactory: async (): Promise<StorageOptionContract> => {
        return {
          type: STORAGE_DEFAULT_TYPE,
          path: STORAGE_DEFAULT_PATH,
        };
      },
      inject: options.inject || [],
    };
  }
}
