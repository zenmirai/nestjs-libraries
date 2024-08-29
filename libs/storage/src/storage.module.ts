import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { DiskOptions } from './storage.interface';
import { LocalStorageAdapter } from './adapters/local-storage.adapter';
import { STORAGE_DECORATOR_PREFIX } from './storage.constant';
import { StorageService } from './storage.service';

@Module({})
export class StorageModule {
  static forRoot(options: {
    imports?: ModuleMetadata['imports'],
    inject?: ModuleMetadata['providers']
  }): DynamicModule {
    console.log(options);
    return {
      module: StorageModule,
      ...options,
    }
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
            console.log(args)
            const adapter = options.adapter || new LocalStorageAdapter({ root: "tmp/" + options.name })
            return new StorageService(adapter)
          },
        }
      ],
      exports: [
        `${STORAGE_DECORATOR_PREFIX}${options.name}`
      ],
      module: StorageModule
    }
  }

  static registerAsync(options: {
    factory: (...args: any) => DynamicModule,
    imports ?: ModuleMetadata['imports'],
    inject ?: ModuleMetadata['providers']
  }): DynamicModule {
    const { factory, ...dynamicModule } = options;

    return {
      providers: [],
      ...dynamicModule,
    }
  }
}
