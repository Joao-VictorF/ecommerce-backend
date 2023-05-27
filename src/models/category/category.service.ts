import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindProductsDto } from '../product/dto/find-products.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoriesDto } from './dto/find-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

/** Responsible for managing categories in the database.
 * CRUD endpoints are available for categories.
 */
@Injectable()
export class CategoryService {
  /** Responsible for managing categories in the database.
   * CRUD endpoints are available for categories.
   *
   * Instantiates the class and the PrismaService dependency
   */
  constructor(private readonly prisma: PrismaService) {}

  /** Creates a new category */
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const name = this.capitalizeOnlyFirstLetter(createCategoryDto.name);

    const category = await this.prisma.category.create({
      data: { ...createCategoryDto, name },
    });

    return category;
  }

  /** Returns all categories with search by name
   * and ordering by name
   */
  async findAll({ categoryName = '' }: FindCategoriesDto): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: {
        name: { contains: categoryName, mode: 'insensitive' },
      },
      orderBy: { name: 'asc' },
    });
  }

  /** Updates category information */
  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    if (updateCategoryDto.name) {
      return this.updateCategoryAndName(id, updateCategoryDto);
    }

    const category = await this.prisma.category.update({
      where: { id },
      data: { ...updateCategoryDto },
    });

    return category;
  }

  /** Removes category from database */
  async remove(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }

  /** Capitalize only the first letter of the category name */
  private capitalizeOnlyFirstLetter(name: string): string {
    return name[0].toUpperCase() + name.substring(1).toLocaleLowerCase();
  }

  /** Formats name and updates the category with the new one.
   *
   * Used when the user updates the category name.
   */
  private updateCategoryAndName(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const name = this.capitalizeOnlyFirstLetter(updateCategoryDto.name);

    return this.prisma.category.update({
      where: { id },
      data: { ...updateCategoryDto, name },
    });
  }
}
