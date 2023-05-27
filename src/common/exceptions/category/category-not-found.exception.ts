import { NotFoundException } from '@nestjs/common';

/** Throws HTTP status 404. Used when the user inputs
 * a category that is not registered in the system
 */
export class CategoryNotFoundException extends NotFoundException {
  /** Throws HTTP status 404 with message
   * 'Categoria não encontrada'. Used when the user inputs
   * a category that is not registered in the system
   */
  constructor() {
    super('Categoria não encontrada');
  }
}
