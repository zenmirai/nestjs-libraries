import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { FlipTransactionCallbackRequestExample } from '@zenmirai/nest-flip';
import { FlipTransactionCallbackData } from './flip-transaction-callback-data.dto';
import { IsValidFlipCallbackToken } from '../validator/flip-callback-token.validator';

export class FlipTransactionCallbackRequest implements FlipTransactionCallbackRequestExample {
  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => FlipTransactionCallbackData)
  data: FlipTransactionCallbackData;

  @IsString()
  @IsNotEmpty()
  @IsValidFlipCallbackToken()
  token: string;
}
