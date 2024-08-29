import { StorageAdapterContract, StorageGetContract, StorageSaveContract } from "../storage.interface";
import { join } from "path";
import { readFile, outputFile } from "fs-extra";
import { Logger } from "@nestjs/common";

export class LocalStorageAdapter implements StorageAdapterContract {
  private logger = new Logger(LocalStorageAdapter.name);
  private root: string = "";

  constructor(options: { root: string }) {
    this.root = options.root
  }

  private getFullPathFromFileName(filename: string) {
    return join(this.root, filename);
  }

  private forwardError(error: Error) {
    this.logger.error(error);
    return Promise.reject(error);
  }

  async load(filename: string): Promise<StorageGetContract> {
    const fullpath = this.getFullPathFromFileName(filename);

    const buffer = await readFile(fullpath).catch(this.forwardError)

    return {
      source: buffer,
      type: 'buffer'
    };
  }

  async save(file: Buffer, filename: string): Promise<StorageSaveContract> {
    const fullpath = this.getFullPathFromFileName(filename);

    await outputFile(fullpath, file).catch(this.forwardError)

    return {
      path: fullpath
    };
  }
}