import { FactoryProvider, ModuleMetadata, Type } from "@nestjs/common";

export interface DiskAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  /**
   * @required
   * name provider for the disk
   */
  name: string;

  /**
   * @optional
   * global flag for this disk
   */
  global?: boolean;

  /**
   * @optional
   * factory that use for this disk
   * when this missed, it will be used disk flip with default configuration
   */
  useExisting?: Type<DiskModuleOptionsFactory>;

  /**
   * @optional
   * factory that use for this disk
   * when this missed, it will be used disk flip with default configuration
   */
  useClass?: Type<DiskModuleOptionsFactory>;

  /**
   * @optional
   * factory function that use for this disk
   * when this missed, it will be used disk flip with default configuration
   */
  useFactory?: (
    ...args: any[]
  ) => Promise<FlipOptionContract>;

  /**
   * @optional
   * Optional list of providers to be injected into the context of the Factory function.
   */
  inject?: FactoryProvider['inject'];
}

export interface DiskModuleOptionsFactory {
  /**
   * Create and return the flip options.
   *
   * @returns {Promise<FlipOptionContract>}
   */
  createOptions(): Promise<FlipOptionContract>;
}

export type FlipOptionContract = {

  /**
   * Type of flip configuration
   */
  type: 'flip';

  secret: string;
  validationToken: string;  
};