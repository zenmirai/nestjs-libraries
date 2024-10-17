import { Transform } from "class-transformer";
import { FlipTransactionCallbackData } from "./flip-transaction-callback-data.dto";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { IsValidFlipCallbackToken } from "../../validator/flip-callback-token.validator";

export class FlipTransactionCallbackRequest {
  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested()
  @IsNotEmpty()
  data: FlipTransactionCallbackData;
  
  @IsString()
  @IsNotEmpty()
  @IsValidFlipCallbackToken()
  token: string;
}