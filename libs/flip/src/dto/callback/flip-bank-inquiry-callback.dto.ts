import { Transform } from "class-transformer";
import { FlipBankInquiryCallbackData } from "./flip-bank-inquiry-callback-data.dto";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { IsValidFlipCallbackToken } from "../../validator/flip-callback-token.validator";

export class FlipBankInquiryCallbackRequest {
  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested()
  @IsNotEmpty()
  data: FlipBankInquiryCallbackData;

  @IsString()
  @IsNotEmpty()
  @IsValidFlipCallbackToken()
  token: string;
}