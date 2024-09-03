import { Controller, Get } from '@nestjs/common';
import { InjectorTestService } from './injector-test.service';

@Controller()
export class InjectorTestontroller {
  constructor(private readonly injectorTestService: InjectorTestService) {}

  @Get('injector-test')
  getHello(): string {
    return this.injectorTestService.getHello();
  }
}
