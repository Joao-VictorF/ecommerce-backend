import { UserServiceInputException } from './user-service-input.exception';

/** Used when the user inputs the wrong
 * current password when trying to create a new password
 */
export class InvalidPasswordUpdateException extends UserServiceInputException {
  /** Throws exception with message 'Senha atual inválida'.
   *
   * Used when the user inputs the wrong current password when
   * trying to create a new password
   */
  constructor() {
    super('Senha atual inválida');
  }
}
