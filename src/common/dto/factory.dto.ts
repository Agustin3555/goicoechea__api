import { INestApplicationContext } from '@nestjs/common'

export type Factory = (
  app: INestApplicationContext,
  attempts: number,
) => Promise<void>
