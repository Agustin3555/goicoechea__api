import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { Auth } from '../common/decorators/auth.decorator'
import { UserRole } from '../common/enums/user-role.enum'
import { ExtractAuthUser } from '../common/decorators/extract-auth-user.decorator'
import { AuthUser } from '../common/interfaces/request-with-auth-user.interface'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(UserRole.ADMIN)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @Get()
  findAll(@ExtractAuthUser() user?: AuthUser) {
    return this.productsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ExtractAuthUser() user?: AuthUser) {
    const { productsService } = this

    return productsService.findOne(id, user?.role)
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN)
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto)
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  remove(@Param('id') id: number) {
    return this.productsService.remove(id)
  }
}
