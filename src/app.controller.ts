import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(`load/:fileName`)
  load(@Param('fileName') fileName: string) {
    return this.appService.load(fileName);
  }

  @Get(`url/:fileName`)
  getUrl(@Param('fileName') fileName: string) {
    return this.appService.getSignUrl(fileName);
  }
}
