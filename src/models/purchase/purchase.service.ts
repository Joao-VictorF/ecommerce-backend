import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import currency from 'currency.js';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePurchaseDto, ProductAmountDto } from './dto/create-purchase.dto';
import { FindPurchasesDto } from './dto/find-purchases.dto';
import { Purchase } from './entities/purchase.entity';
import { NotPurchaseOwnerException } from './exceptions/not-purchase-owner.exception';
import { Prisma } from '@prisma/client';

/** Responsible for managing purchases in the database.
 * CRUD endpoints are available for purchases.
 */
@Injectable()
export class PurchaseService {
  /** Responsible for managing purchases in the database.
   * CRUD endpoints are available for purchases.
   *
   * Instantiates the class and the PrismaService dependency
   */
  constructor(private readonly prisma: PrismaService) {}

  /** Creates a new purchase */
  async create(
    userId: string,
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    const totalPrice = await this.calculateTotalPrice(createPurchaseDto);

    const purchaseItems: Prisma.PurchaseItemCreateWithoutPurchaseInput[] =
      createPurchaseDto.products.map((product: ProductAmountDto) => ({
        amount: product.amount ?? 1,
        product: { connect: { id: product.productId } },
      }));

    // Update the stock of each product
    const updateStockPromises = createPurchaseDto.products.map(
      async (product: ProductAmountDto) => {
        const updatedProduct = await this.prisma.product.update({
          where: { id: product.productId },
          data: {
            stock: {
              decrement: product.amount ?? 1,
            },
          },
        });
        return updatedProduct;
      },
    );

    // Execute the stock update promises
    await Promise.all(updateStockPromises);

    // Create a new purchase
    const purchase = await this.prisma.purchase.create({
      data: {
        totalPrice,
        userId,
        purchaseItems: {
          create: purchaseItems,
        },
      },
    });
    return purchase;
  }

  /** Returns all purchases with pagination
   * Default is starting on page 1 showing 10 results per page
   * and ordering by name
   */
  async findAll({ userId }: FindPurchasesDto): Promise<Purchase[]> {
    const purchases = await this.prisma.purchase.findMany({
      where: {
        userId: { equals: userId },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { email: true } },
        purchaseItems: {
          select: {
            amount: true,
            product: { select: { name: true, picture: true } },
          },
        },
      },
    });

    return purchases;
  }

  /** Find purchase by ID, normal users can only get their purchases,
   * Admins can get any.
   */
  async findOne(
    purchaseId: string,
    userId: string,
    userRole: string,
  ): Promise<Purchase> {
    const purchase = await this.prisma.purchase.findUnique({
      where: { id: purchaseId },
      include: {
        user: { select: { email: true } },
        purchaseItems: {
          include: {
            product: { select: { name: true, picture: true } },
          },
        },
      },
      rejectOnNotFound: true,
    });

    if (userRole !== Role.ADMIN && purchase.userId !== userId) {
      throw new NotPurchaseOwnerException();
    }

    return purchase;
  }

  /** Updates purchase information */
  // async update(
  //   id: string,
  //   updatePurchaseDto: UpdatePurchaseDto,
  // ): Promise<Purchase> {
  //   const purchase = await this.prisma.purchase.findUnique({ where: { id } });

  //   const productId = updatePurchaseDto.productId || purchase.productId;
  //   const amount = updatePurchaseDto.amount || purchase.amount;
  //   const totalPrice = await this.calculateTotalPrice({ productId, amount });

  //   const updatedPurchase = await this.prisma.purchase.update({
  //     where: { id },
  //     data: { ...updatePurchaseDto, totalPrice },
  //     include: {
  //       user: { select: { email: true } },
  //       product: { select: { name: true } },
  //     },
  //   });

  //   return updatedPurchase;
  // }

  /** Removes purchase from database */
  async remove(id: string): Promise<void> {
    await this.prisma.purchase.delete({ where: { id } });
  }

  private async calculateTotalPrice(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<number> {
    let totalPrice = 0;
    for (const purchaseProduct of createPurchaseDto.products) {
      const product = await this.prisma.product.findUnique({
        where: { id: purchaseProduct.productId },
      });
      console.log(product);
      console.log(purchaseProduct.productId);
      const totalProductPrice = currency(product.basePrice.toNumber()).multiply(
        purchaseProduct.amount,
      );
      totalPrice = totalPrice + totalProductPrice.value;
    }
    return totalPrice;
  }
}
