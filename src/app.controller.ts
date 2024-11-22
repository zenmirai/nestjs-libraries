import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() { }
  
  @Get()
  @Redirect('https://github.com/zenmirai/nestjs-libraries/blob/master/CONTRIBUTING.md')
  welcome() {
    return;
  }
}
