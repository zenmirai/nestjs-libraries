import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { FlipAcceptPaymentCallbackData } from './flip-accept-payment-callback-data.dto';
import { FlipAcceptPaymentCallbackRequestExample } from 'flip/flip';
import { IsValidFlipCallbackToken } from '../validator/flip-callback-token.validator';

export class FlipAcceptPaymentCallbackRequest implements FlipAcceptPaymentCallbackRequestExample {
  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => FlipAcceptPaymentCallbackData)
  data: FlipAcceptPaymentCallbackData;

  @IsString()
  @IsNotEmpty()
  @IsValidFlipCallbackToken()
  token: string;
}
