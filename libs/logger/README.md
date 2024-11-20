# Zenmirai Logger Module

A NestJS logger for just about everything

## Motivation

Zenmirai Logger Module is about how we fast to debug, develop and inspect any problems on development and production

Zenmirai Logger Module is designed to be a simple logging library with support for multiple transports, this module aims to decouple parts of the logging process to make it more flexible and extensible

## Procedure

How we use this

### Install

Install module (recommended using useClass)
```ts
import { LoggerModule } from '@zenmirai/nestjs-logger-module';

@Module({
  imports: [
    /**
     * using factory
     */
    LoggerModule.forAsyncRoot({
      imports: [ConfigModule]
      inject: [ConfigService],
      useFactory: (configService) => {
        return configService.get('logger');
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

dont forget assign app to make it works properly
```ts
import { LoggerService } from '@zenmirai/nestjs-logger-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // this make service hendle logger installation
  app.get(LoggerService).assignApp(app);

  await app.listen(3000);
}
```
### Usage

```ts
import { LoggerService } from '@zenmirai/nestjs-logger-module';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    /**
     * because LoggerService is TRANSIENT Scope it will be
     * use by only this class
     * 
     * other service will not interupt this logger service
     * 
     * @see https://docs.nestjs.com/fundamentals/injection-scopes
     */
    private readonly logger: LoggerService,


    private readonly disk: Disk
  ) {}

  async saveToDisk(): string {
    this.logger.pushContext(this.saveToDisk.name);
    this.logger.log("called");

    this.logger.verbose("saving file text.txt");
    await this.disk.write("text.txt");
    this.logger.verbose("saved file text.txt");

    this.logger.log("success");
    return 'saved';
  }
}
```

output might be

```bash
[Nest] 7  - 11/19/2024, 9:50:49 AM LOG [019343d4-f2d7-76e3-a603-c6ad125df65b][Http][LoggerMiddleware.consume] http request incomming localhost:3000/app/example?name=test
[Nest] 7  - 11/19/2024, 9:50:49 AM VERBOSE [019343d4-f2d7-76e3-a603-c6ad125df65b][Http][LoggerInterceptor.intercept] data: { body }
[Nest] 7  - 11/19/2024, 9:50:49 AM LOG [019343d4-f2d7-76e3-a603-c6ad125df65b][Http][AppController.save] called
[Nest] 7  - 11/19/2024, 9:50:49 AM VERBOSE [019343d4-f2d7-76e3-a603-c6ad125df65b][Http][AppController.save] calling AppService.saveToDisk
[Nest] 7  - 11/19/2024, 9:50:49 AM LOG [019343d4-f2d7-76e3-a603-c6ad125df65b][Http][AppService.saveToDisk] called
[Nest] 7  - 11/19/2024, 9:50:49 AM VERBOSE [019343d4-f2d7-76e3-a603-c6ad125df65b][Http][AppService.saveToDisk] saving file text.txt
[Nest] 7  - 11/19/2024, 9:50:49 AM VERBOSE [019343d4-f2d7-76e3-a603-c6ad125df65b][Http][AppService.saveToDisk] saved file text.txt
[Nest] 7  - 11/19/2024, 9:50:49 AM LOG [019343d4-f2d7-76e3-a603-c6ad125df65b][Http][AppService.saveToDisk] success
[Nest] 7  - 11/19/2024, 9:50:49 AM LOG [019343d4-f2d7-76e3-a603-c6ad125df65b][Http][AppController.save] send response
```

other logs will be generate by controller and build-in interceptor so you dont need to care about other logs, only focus on logs that fired by AppService.saveToDisk (see log row within [AppService.saveToDisk] at row)

## Drivers

We have several drivers, here's logger that we have and how we use

### Driver Installation

```ts
import { WinstonDriver } from '@zenmirai/nestjs-logger-module';

@Module({
  imports: [
    LoggerModule.forAsyncRoot({
      imports: [ConfigModule]
      inject: [ConfigService],
      useFactory: (configService) => {
        const config = configService.getOrThrow('logger');

        return {
          driver: new WinstonDriver(config.winston),
        }
      }
    })
  ]
})
class AppModule
```

### Custom Adapter

There's build-in adapter, however we can bring your own adapter and use famous logger plugin like in


```ts
import { LoggerService } from '@zenmirai/nestjs-logger-module';
import { Injectable } from '@nestjs/common';

@Injectable()
class CustomLoggerAdapter extends LoggerService {

}
```
