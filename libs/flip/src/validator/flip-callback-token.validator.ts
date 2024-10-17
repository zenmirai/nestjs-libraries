import { Injectable, Logger } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { FlipService } from '../flip.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class FlipCallbackTokenValidator
  implements ValidatorConstraintInterface
{
  private readonly logger = new Logger(FlipCallbackTokenValidator.name);

  constructor(private readonly flipService: FlipService) {}

  async validate(token: string, args: ValidationArguments) {
    this.logger.log(`Validating Flip Callback Token: ${token}`);
    const isValid = await this.flipService.validateCallbackToken(token);

    this.logger.log(`Token is ${isValid ? 'valid' : 'invalid'}`);
    return isValid;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Token is Invalid';
  }
}

export function IsValidFlipCallbackToken(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: FlipCallbackTokenValidator,
    });
  };
}
