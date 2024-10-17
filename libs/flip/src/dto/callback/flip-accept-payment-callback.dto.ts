import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { FlipAcceptPaymentCallbackData } from './flip-accept-payment-callback-data.dto';
import { IsValidFlipCallbackToken } from '../../validator/flip-callback-token.validator';

export class FlipAcceptPaymentCallbackRequest {
  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested()
  @IsNotEmpty()
  data: FlipAcceptPaymentCallbackData;

  @IsString()
  @IsNotEmpty()
  @IsValidFlipCallbackToken()
  token: string;
}
