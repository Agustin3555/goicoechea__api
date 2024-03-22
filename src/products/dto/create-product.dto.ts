import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

export class CreateProductDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  desc?: string

  @IsNumber()
  @Min(0)
  price: number

  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number

  @IsInt()
  @Min(0)
  @IsOptional()
  minStockAlert?: number

  @IsBoolean()
  @IsOptional()
  imported?: boolean
}
