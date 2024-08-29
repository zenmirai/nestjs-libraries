export interface StorageGetContract {
  /**
   * type file that has been loaded
   * 
   * **currently only buffer support**
   */
  type: "buffer"

  /**
   * source that expected there
   */
  source: Buffer,
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
  getSignUrl?(): string;

  /**
   * Save source file to disk
   * 
   * @param file 
   * @param filename 
   */
  save(file: Buffer, filename: string): Promise<StorageSaveContract> | StorageSaveContract;

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
  adapter?: StorageAdapterContract
};