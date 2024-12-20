import { GetObjectCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { join } from 'path';
import { Readable } from 'stream';
import {
  StorageAdapterContract,
  StorageConfigS3,
  StorageGetContract,
  StorageSaveContract,
} from '../storage.interface';
import { MimeTypes } from '../storage.record';

export class S3StorageAdapter implements StorageAdapterContract {
  private readonly root: string = '';
  private readonly client: S3;

  constructor(private options: StorageConfigS3) {
    this.root = this.options.path;

    /**
     * Creating s3 Client based on @params options
     */
    this.client = new S3({
      region: options.region,
      credentials: {
        accessKeyId: options.key,
        secretAccessKey: options.secret,
      },
    });
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
    console.error(error);
    return Promise.reject(error);
  }

  /**
   * load file from storage
   *
   * @param fileName
   * @returns Promise<StorageGetContract>
   */
  async load(fileName: string): Promise<StorageGetContract> {
    const fullpath = this.getFullPathFromFileName(fileName);

    const params = new GetObjectCommand({
      Bucket: this.options.bucket,
      Key: fullpath,
    });

    const { Body } = await this.client.send(params).catch(this.forwardError);
    const buffer = await this.streamToBuffer(Body as Readable);

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
  async save(file: Buffer, fileName: string): Promise<StorageSaveContract> {
    const fullpath = this.getFullPathFromFileName(fileName);

    const params = new PutObjectCommand({
      Bucket: this.options.bucket,
      Key: fullpath,
      Body: file,
      ContentType: this.getMimeFromExtension(fileName),
    });

    await this.client.send(params).catch(this.forwardError);

    return {
      path: fullpath,
    };
  }

  /**
   * get signed url from storage
   *
   * @param fileName
   * @returns Promise<string>
   */
  async getSignedUrl(fileName: string): Promise<string> {
    const fullpath = this.getFullPathFromFileName(fileName);

    const params = new GetObjectCommand({
      Bucket: this.options.bucket,
      Key: fullpath,
    });

    return await getSignedUrl(this.client, params, {
      expiresIn: this.options.expiredTime,
    }).catch(this.forwardError);
  }

  /**
   * get mime from file extension
   *
   * @param fileName
   * @returns string
   */
  private getMimeFromExtension = (fileName: string): string => {
    const fileSplit = fileName.split('.');
    const fileExtension = fileSplit[fileSplit.length - 1];

    for (const mimeType in MimeTypes) {
      const meta = MimeTypes[mimeType];
      if (meta.extensions && meta.extensions.includes(fileExtension)) {
        return meta.extensions[0];
      }
    }

    return '';
  };

  /**
   * transform stream into buffer
   *
   * @param stream
   * @returns Promise<Buffer>
   */
  private async streamToBuffer(stream: Readable): Promise<Buffer> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
}
