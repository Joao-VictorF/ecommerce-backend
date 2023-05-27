import { BadRequestException } from '@nestjs/common';

/** Throws HTTP status 400. Used when the user inputs
 * a category name that is already registered in the system
 */
export class CategoryNameInUseException extends BadRequestException {
  /** Throws HTTP status 400 with message
   * 'Categoria já está em uso.'. Used when the user inputs
   * a category name that is already registered in the system
   */
  constructor() {
    super('Categoria já está em uso.');
  }
}
