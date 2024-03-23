import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsSelect, Repository } from 'typeorm'
import { Product } from './entities/product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { UserRole } from '../common/enums/user-role.enum'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private products: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { products } = this

    return await products.save(createProductDto)
  }

  async findAll() {
    const { products } = this

    return await products.find()
  }

  async findOne(id: number, role?: UserRole) {
    const { products } = this

    const selectByRole: Record<
      'public' | UserRole,
      FindOptionsSelect<Product>
    > = {
      public: {
        desc: true,
        price: true,
        createdAt: true,
        updatedAt: true,
      },
      [UserRole.EMPLOYEE]: {
        desc: true,
        price: true,
        stock: true,
        imported: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      [UserRole.ADMIN]: {
        desc: true,
        price: true,
        stock: true,
        minStockAlert: true,
        imported: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    }

    const product = await products.findOne({
      where: { id },
      select: selectByRole[role !== undefined ? role : 'public'],
    })

    if (!product) throw new NotFoundException()
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  async remove(id: number) {
    return `This action removes a #${id} product`
  }
}
