import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm'

export enum UserRole {
  ADMIN,
  EMPLOYEE,
}

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

  @Column()
  password: string

  @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYEE })
  role: UserRole

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
