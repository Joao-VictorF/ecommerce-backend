import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

/** Describes the information to search for products */
export class FindProductsDto {
  /** String containing in product name
   * @example "chair"
   */
  @IsOptional()
  @IsString()
  productName?: string;
}
