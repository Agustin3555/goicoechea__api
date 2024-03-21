import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'
import { UserRole } from '../entities/user.entity'

export class CreateUserDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole
}
