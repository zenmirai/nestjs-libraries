import { IsNumber } from 'class-validator';

export class FlipGetBalanceResponse {
  @IsNumber()
  balance: number;
}
