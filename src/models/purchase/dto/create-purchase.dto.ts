import {
  IsArray,
  ValidateNested,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

/** Describes the fields needed to create a Purchase */
export class CreatePurchaseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductAmountDto)
  @Transform(({ value }) => value ?? [], { toClassOnly: true }) // Transform undefined to an empty array
  products: ProductAmountDto[];
}

export class ProductAmountDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount?: number;
}
