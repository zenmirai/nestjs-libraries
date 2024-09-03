import { Logger } from '@nestjs/common';
import { outputFile, readFile } from 'fs-extra';
import { join } from 'path';
import {
  StorageAdapterContract,
  StorageGetContract,
  StorageSaveContract,
} from '../storage.interface';

export class LocalStorageAdapter implements StorageAdapterContract {
  private logger = new Logger(LocalStorageAdapter.name);
  private root: string = '';

  constructor(options: { root: string }) {
    this.root = options.root;
  }

  /**
   * get full path of the filename
   *
   * @param filename
   * @returns string
   */
  private getFullPathFromFileName(filename: string) {
    return join(this.root, filename);
  }

  /**
   * rejecting promise
   *
   * @param error
   * @returns
   */
  private forwardError(error: Error) {
    this.logger.error(error);
    return Promise.reject(error);
  }

  /**
   * load file from storage
   *
   * @param fileName
   * @returns Promise<StorageGetContract>
   */
  async load(filename: string): Promise<StorageGetContract> {
    const fullpath = this.getFullPathFromFileName(filename);
    const buffer = await readFile(fullpath).catch(this.forwardError);

    return {
      source: buffer,
      type: 'buffer',
    };
  }

  /**
   * save file to storage
   *
   * @param file
   * @param fileName
   * @returns Promise<StorageSaveContract>
   */
  async save(file: Buffer, filename: string): Promise<StorageSaveContract> {
    const fullpath = this.getFullPathFromFileName(filename);

    await outputFile(fullpath, file).catch(this.forwardError);

    return {
      path: fullpath,
    };
  }

  /**
   * get signed url from storage
   *
   * @param fileName
   * @returns string
   */
  getSignUrl(filename: string): string {
    return '';
  }
}
