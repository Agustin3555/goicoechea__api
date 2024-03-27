import { Factory } from '../common/dto/factory.dto'
import { UsersService } from './users.service'
import { UserRole } from '@prisma/client'
import { fakerES as faker } from '@faker-js/faker'

export const createUsers: Factory = async (app, attempts) => {
  const usersService = app.get(UsersService)

  await usersService.create({
    name: 'Juan Agustín',
    lastName: 'Lovera',
    email: 'Agustin3555@hotmail.com',
    password: 'pass',
    role: UserRole.ADMIN,
  })

  for (let i = 0; i < attempts; i++) {
    try {
      const name = faker.person.firstName()
      const firstName = name.split(' ')[0].toLowerCase()

      await usersService.create({
        name,
        lastName: faker.person.lastName(),
        email: `${firstName}${faker.number.int({ max: 1000 })}@example.com`,
        password: `pass${i + 2}`,
      })
    } catch (error) {}
  }
}
