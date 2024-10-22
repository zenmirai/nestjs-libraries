import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { FlipAcceptPaymentCallbackDataExample } from './flip-accept-payment-callback-data.dto';

export class FlipAcceptPaymentCallbackRequestExample {
  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => FlipAcceptPaymentCallbackDataExample)
  data: FlipAcceptPaymentCallbackDataExample;

  @IsString()
  @IsNotEmpty()
  // @IsValidFlipCallbackToken()
  token: string;
}
