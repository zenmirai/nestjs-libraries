```ts
@Injectable()
class MetaWhatsappChannel implements Channel {
  this.whatsapp: any;

  constructor(private readonly config: ConfigService){
    this.whastapp = new WhatsappApi(config.getOrThrow('wa-config'));
  }

  dispatch(text: string) {
    this.whatsapp.send(text);
  }
}
```

```ts
@Module({
  // ini as global: true
  NotificationModule.forRoot({
    imports: [ConfigModule],

    // broadcast to service
    channels: [
      MetaWhatsappChannel,
    ]
  })
})
class AppModule {}
```

```ts
@Module({
  imports: [
    // ini cuma focus inject notification
    NotificationModule.forFeature({
      notifications: [
        UserCreatedNotification
      ]
    })
  ]
})
class UserModule {}
```

```ts
@Injectable()
class UserCreatedNotification implements Notification {
  // channel that used to broadcast message
  get channels(): Channel[] {
    return [MetaWhatsappChannel]
  }

  // method that used on service, when it's fired, it will be send
  send({ email }) {
    return `email ${email} telah terdaftar`
  }
}
```


```ts
@Injectable()
class UserService {
  constructor(private readonly userCreatedNotification: UserCreatedNotification) {}
  
  // how we use
  create() {
    const email = "aziz@zenmirai.com";
    this.userCreatedNotification.send({ email });
  }
}
```