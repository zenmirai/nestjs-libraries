# Flip Module
this for manage how we interact with flip backend

## How it works
it provide flip into module that developer register at, also 
it's possible to make global installation


## How to use
it's how you provide it and make provider works

### How to install static
```ts
FlipModule.register({
  // options
  global: true // install for global module
})
```
Note: global will only work for one registration of flip, when you need more than one, global isn't not options for right now and it's can be developed

### How to install with factory
```ts
FlipModule.registerAsync({
  import: [ConfigModule],
  inject: [ConfigService],
  useFactory(config: any) {
    return config.get('flip')
  }
  global: true, // install for global module
})
```
Note: global will only work for one registration of flip, when you need more than one, global isn't not options for right now and it's can be developed

### How we use
```ts
class PaymentService {
  constructor(flip: FlipService) {}

  public async withFlip() {
    this.flip.xxxx
  }
}
```

