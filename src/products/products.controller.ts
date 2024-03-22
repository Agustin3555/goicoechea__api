import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { Auth } from '../common/decorators/auth.decorator'
import { UserRole } from '../common/enums/user-role.enum'
import { ProductsService } from './products.service'
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
  @Auth(UserRole.ADMIN, UserRole.EMPLOYEE)
  findAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  @Auth(UserRole.ADMIN, UserRole.EMPLOYEE)
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id)
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
