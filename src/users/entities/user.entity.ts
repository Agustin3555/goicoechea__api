import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm'
import { UserRole } from '../../common/enums/user-role.enum'

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  lastName?: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string

  @Column('enum', { enum: UserRole, default: UserRole.EMPLOYEE })
  role: UserRole

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
