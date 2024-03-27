import { Factory } from '../common/dto/factory.dto'
import { UsersService } from './users.service'
import { UserRole } from '@prisma/client'
import { fakerES as faker } from '@faker-js/faker'

export const usersFactory = new Factory({
  serviceClass: UsersService,
  singleSeeding: {
    callback: async (usersService) => {
      await usersService.create({
        name: 'Juan Agustín',
        lastName: 'Lovera',
        email: 'Agustin3555@hotmail.com',
        password: 'pass',
        role: UserRole.ADMIN,
      })
    },
  },
  multiSeeding: {
    attempts: 10,
    callback: async (usersService, i) => {
      const name = faker.person.firstName()
      const firstName = name.split(' ')[0].toLowerCase()

      await usersService.create({
        name,
        lastName: faker.person.lastName(),
        email: `${firstName}${faker.number.int({ max: 1000 })}@example.com`,
        password: `pass${i + 2}`,
      })
    },
  },
})
