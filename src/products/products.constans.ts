import { UserRole } from '../common/enums/user-role.enum'

export type ProductColumns =
  | 'id'
  | 'name'
  | 'manufacturer'
  | 'category'
  | 'desc'
  | 'price'
  | 'stock'
  | 'minStockAlert'
  | 'imported'
  | 'createdBy'
  | 'createdAt'
  | 'updatedBy'
  | 'updatedAt'
  | 'deletedBy'
  | 'deletedAt'

export const obj: Record<
  UserRole | 'public',
  Partial<Record<'findMany' | 'findOne' | 'updateOne', ProductColumns[]>>
> = {
  public: {
    findMany: ['id', 'name', 'manufacturer', 'category', 'price'],
    findOne: ['desc', 'stock'],
  },
  [UserRole.EMPLOYEE]: {
    findMany: ['id', 'name', 'manufacturer'],
    findOne: [
      'category',
      'price',
      'desc',
      'stock',
      'imported',
      'createdBy',
      'createdAt',
      'updatedBy',
      'updatedAt',
      'deletedBy',
      'deletedAt',
    ],
  },
  [UserRole.ADMIN]: {
    findMany: ['id', 'name', 'manufacturer'],
    findOne: [
      'category',
      'price',
      'desc',
      'stock',
      'minStockAlert',
      'imported',
      'createdBy',
      'createdAt',
      'updatedBy',
      'updatedAt',
      'deletedBy',
      'deletedAt',
    ],
    updateOne: [
      'name',
      'manufacturer',
      'category',
      'desc',
      'price',
      'stock',
      'minStockAlert',
      'imported',
    ],
  },
}
