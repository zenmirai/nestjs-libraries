import { FactoryProvider, ModuleMetadata, Type } from '@nestjs/common';

export interface StorageGetContract {
  /**
   * type file that has been loaded
   *
   * **currently only buffer support**
   */
  type: 'buffer';

  /**
   * source that expected there
   */
  source: Buffer;
}

export interface StorageSaveContract {
  /**
   * where place of source file that has saved
   */
  path: string;
}

export interface StorageAdapterContract {
  /**
   * get signed URL to download
   *
   */
  getSignedUrl?(fileName: string): Promise<string> | string;

  /**
   * Save source file to disk
   *
   * @param file
   * @param filename
   */
  save(
    file: Buffer,
    filename: string,
  ): Promise<StorageSaveContract> | StorageSaveContract;

  /**
   * Load file from source by passing folder structure
   *
   * for security purpose, path can't pass any traversal path (e.x `../../`) for preventing directory traversal attack
   *
   * @param path
   */
  load(path: string): Promise<StorageGetContract> | StorageGetContract;
}

export type DiskOptions = {
  /**
   * name you use for `@InjectDisk()` decorator
   *
   */
  name: string;

  /**
   * adapter that use for this disk
   * when this missed, it will be used disk storage with default configuration
   *
   */
  adapter?: StorageOptionContract;
};

export interface DiskAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  /**
   * @required
   * name provider for the disk
   */
  name: string;

  /**
   * @optional
   * factory that use for this disk
   * when this missed, it will be used disk storage with default configuration
   */
  useExisting?: Type<DiskModuleOptionsFactory>;

  /**
   * @optional
   * factory that use for this disk
   * when this missed, it will be used disk storage with default configuration
   */
  useClass?: Type<DiskModuleOptionsFactory>;

  /**
   * @optional
   * factory function that use for this disk
   * when this missed, it will be used disk storage with default configuration
   */
  useFactory?: (
    ...args: any[]
  ) => Promise<StorageOptionContract> | StorageOptionContract;

  /**
   * @optional
   * Optional list of providers to be injected into the context of the Factory function.
   */
  inject?: FactoryProvider['inject'];
}

export interface DiskModuleOptionsFactory {
  /**
   * Create and return the storage options.
   *
   * @returns {Promise<StorageOptionContract>}
   */
  createOptions(): Promise<StorageOptionContract> | StorageOptionContract;
}

/**
 * StorageOptionContract must be either S3 or Local
 */
export type StorageOptionContract = StorageConfigS3 | StorageLocal;
export type StorageConfigS3 = {
  /**
   * Type of storage configuration
   */
  type: 's3';

  /**
   * AWS S3 bucket name
   */
  bucket: string;

  /**
   * AWS S3 access key
   */
  key: string;

  /**
   * AWS S3 secret key
   */
  secret: string;

  /**
   * AWS S3 region
   */
  region: string;

  /**
   * Expired time in seconds for signed URL
   */
  expiredTime: number;

  /**
   * Path to store files
   */
  path: string;
};

export type StorageLocal = {
  /**
   * Type of storage configuration
   */
  type: 'local';

  /**
   * Path to store files
   */
  path: string;
};
