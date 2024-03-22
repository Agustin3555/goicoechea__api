import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
} from 'typeorm'

@Entity()
export class Product {
  @Column({ primary: true, generated: true })
  id: number

  @Column({ unique: true })
  name: string

  @Column('text', { nullable: true })
  desc?: string

  @Column('float')
  price: number

  @Column({ default: 1 })
  stock: number

  @Column({ default: 1 })
  minStockAlert: number

  @Column({ default: false })
  imported: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date
}
