import { Prisma } from '@prisma/client';

/** Describes the properties of a Purchase in the database */
export class Purchase implements Prisma.PurchaseUncheckedCreateInput {
  /** Purchase ID as UUID
   * @example "b076f72e-f70b-4368-949e-1811c405c0f7"
   */
  id?: string;

  /** User ID as UUID
   * @example "a04bb2db-fecd-4889-979e-95f273eb70e1"
   */
  userId?: string;

  /** Price paid per product multiplied by the amount
   * Saved as decimal, calculations should be handled
   * with currency.js
   * @example 138.75
   */
  totalPrice: string | number | Prisma.Decimal;

  /** Purchase createdAt date */
  createdAt?: string | Date;
}
