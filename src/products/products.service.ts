import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Prisma, UserRole } from '@prisma/client'

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userEmail: string, createProductDto: CreateProductDto) {
    const { prisma } = this

    return await prisma.product.create({
      data: {
        createdByUser: { connect: { email: userEmail } },
        ...createProductDto,
      },
    })
  }

  async findAll() {
    const { prisma } = this

    return await prisma.product.findMany()
  }

  async findOne(id: number, role?: UserRole) {
    const { prisma } = this

    const selectByRole: Record<'public' | UserRole, Prisma.ProductSelect> = {
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
        createdByUser: { select: { id: true, name: true } },
        createdAt: true,
        updatedByUser: { select: { id: true, name: true } },
        updatedAt: true,
        deletedByUser: { select: { id: true, name: true } },
        deletedAt: true,
      },
    }

    const product = await prisma.product.findUnique({
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
