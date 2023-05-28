import { NotFoundException } from '@nestjs/common';

/** Throws HTTP status 404. Used when the user inputs
 * a purchase that is not registered in the system
 */
export class PurchaseNotFoundException extends NotFoundException {
  /** Throws HTTP status 404 with message
   * 'Compra não encontrada'. Used when the user inputs
   * a purchase that is not registered in the system
   */
  constructor() {
    super('Compra não encontrada');
  }
}
