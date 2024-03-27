import { NestFactory } from '@nestjs/core'
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { usersFactory } from './users/users.factory'

const main = async () => {
  console.log('🌱 Seeding\n')

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  await usersFactory.seed(app)

  console.log('\n🌳 Filled\n')
}

main().catch((e) => {
  console.log('\n🍂 Oops\n')

  console.error(e)
  process.exit(1)
})
