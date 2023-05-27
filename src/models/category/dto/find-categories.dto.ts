import { IsOptional, IsString } from 'class-validator';

/** Describes the information to search for categories */
export class FindCategoriesDto {
  /** String containing in category name
   * @example "chair"
   */
  @IsOptional()
  @IsString()
  categoryName?: string;
}
