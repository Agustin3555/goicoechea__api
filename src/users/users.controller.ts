import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common'
import { Auth } from '../common/decorators/auth.decorator'
import { UserRole } from '@prisma/client'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
@Auth(UserRole.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id)
  }

  @Get('fullName/:fullName')
  findByFullName(@Param('fullName') fullName: string) {
    return this.usersService.findByFullName(fullName)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id)
  }
}
