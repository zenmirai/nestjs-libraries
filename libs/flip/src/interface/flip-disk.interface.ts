import { DynamicModule, FactoryProvider } from '@nestjs/common';

export type FlipAsyncOptions = Pick<DynamicModule, 'imports' | 'global'> &
  FactoryProvider<FlipOptionContract>;

export type FlipOptionContract = {
  /**
   * Type of flip configuration
   */
  type: 'flip';
  secret: string;
  validationToken: string;
};
