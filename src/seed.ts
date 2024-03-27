import { NestFactory } from '@nestjs/core'
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify'
import { AppModule } from 'src/app.module'
import { createUsers } from 'src/users/users.factory'

const main = async () => {
  console.log('🌱 Planting\n')

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  await createUsers(app, 10)

  console.log('\n🌳 Filled\n')
}

main().catch((e) => {
  console.log('\n🍂 Oops\n')

  console.error(e)
  process.exit(1)
})
