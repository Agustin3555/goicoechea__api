import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './entities/product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private products: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.products.save(createProductDto)
  }

  async findAll() {
    return await this.products.find()
  }

  async findOne(id: number) {
    return `This action returns a #${id} product`
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  async remove(id: number) {
    return `This action removes a #${id} product`
  }
}
