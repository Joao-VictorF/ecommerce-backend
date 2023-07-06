import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { File } from './types/file';

/** Responsible for managing products in the database.
 * CRUD endpoints are available for products.
 */
@Injectable()
export class ProductService {
  /** Responsible for managing products in the database.
   * CRUD endpoints are available for products.
   *
   * Instantiates the class and the PrismaService dependency
   */
  constructor(private readonly prisma: PrismaService) {}

  /** Creates a new product */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const urlName = this.formatUrlName(createProductDto.name);

    const categories = this.connectCategoriesById(createProductDto.categories);

    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
        urlName,
        categories,
      },
      include: { categories: { select: { name: true } } },
    });

    return product;
  }

  /** Uploads new product picture */
  async uploadPicture(id: string, file: File): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: { picture: file.filename },
    });
  }

  // Returns all products with pagination
  async findAll({ productName = '' }: FindProductsDto): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        name: { contains: productName, mode: 'insensitive' },
        stock: { gt: 0 },
      },
      orderBy: { name: 'asc' },
      include: { categories: { select: { id: true, name: true } } },
    });
  }

  /** Find product by ID */
  async findOneById(id: string): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id },
      include: { categories: { select: { name: true } } },
      rejectOnNotFound: true,
    });
  }

  /** Find product by Url Name */
  async findOneByUrlName(urlName: string): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { urlName },
      include: { categories: { select: { name: true } } },
      rejectOnNotFound: true,
    });
  }

  /** Updates product information */
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    if (updateProductDto.name) {
      return this.updateProductAndUrlName(id, updateProductDto);
    }

    const categories = this.connectCategoriesById(updateProductDto.categories);

    return this.prisma.product.update({
      where: { id },
      data: { ...updateProductDto, categories },
      include: { categories: { select: { id: true, name: true } } },
    });
  }

  /** Removes product from database */
  async remove(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  /** Formats the name to generate an urlName.
   *
   * Makes the name lower case, remove leading and trailing white spaces,
   * turn to single the multiple spaces between words and make
   * single spaces hyphens
   *
   * @example " BraNd1    chAir   " becomes "brand1-chair"
   */
  private formatUrlName(name: string): string {
    const lowerCaseUrlName = name.toLocaleLowerCase();
    const trimmedUrlName = lowerCaseUrlName.trim();
    const singleSpaceUrlName = trimmedUrlName.replace(/\s\s+/g, ' ');
    const spaceToHyphenUrlName = singleSpaceUrlName.split(' ').join('-');

    return spaceToHyphenUrlName;
  }

  /** Formats UrlName and updates the product with the new one.
   *
   * Used when the user updates the product name.
   */
  private updateProductAndUrlName(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const urlName = this.formatUrlName(updateProductDto.name);

    const categories = this.connectCategoriesById(updateProductDto.categories);

    return this.prisma.product.update({
      where: { id },
      data: { ...updateProductDto, urlName, categories },
      include: { categories: { select: { id: true, name: true } } },
    });
  }

  /**
   * Format the categories IDs array into the prisma query way
   */
  private connectCategoriesById(
    categories: string[],
  ): Prisma.CategoryUncheckedCreateNestedManyWithoutProductsInput {
    let categoriesConnection = { connect: [] };

    if (categories) {
      categoriesConnection = {
        connect: categories.map((category) => {
          return { id: category };
        }),
      };
    }

    return categoriesConnection;
  }
}
