import { INestApplicationContext, Type } from '@nestjs/common'

export class Factory<T> {
  private readonly ServiceClass: Type<T>
  private readonly singleSeeding: {
    callback?: (service: T) => Promise<void>
  }
  private readonly multiSeeding: {
    attempts: number
    callback: (service: T, index: number) => Promise<void>
  }

  constructor({
    serviceClass,
    singleSeeding,
    multiSeeding,
  }: {
    serviceClass: Type<T>
    singleSeeding?: {
      callback?: (service: T) => Promise<void>
    }
    multiSeeding: {
      attempts: number
      callback: (service: T, index: number) => Promise<void>
    }
  }) {
    this.ServiceClass = serviceClass
    this.singleSeeding = singleSeeding
    this.multiSeeding = multiSeeding
  }

  async seed(app: INestApplicationContext) {
    const { ServiceClass, singleSeeding, multiSeeding } = this

    const service = app.get(ServiceClass)

    try {
      await singleSeeding.callback(service)
    } catch (error) {}

    for (let i = 0; i < multiSeeding.attempts; i++) {
      try {
        await multiSeeding.callback(service, i)
      } catch (error) {}
    }
  }
}
