import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { FlipTransactionCallbackDataExample } from './flip-transaction-callback-data.dto';

export class FlipTransactionCallbackRequestExample {
  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => FlipTransactionCallbackDataExample)
  data: FlipTransactionCallbackDataExample;

  @IsString()
  @IsNotEmpty()
  // @IsValidFlipCallbackToken()
  token: string;
}
