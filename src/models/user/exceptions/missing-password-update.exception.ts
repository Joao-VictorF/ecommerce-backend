import { UserServiceInputException } from './user-service-input.exception';

/** Used when the user inputs only the current password
 * or the new password, but both are needed to update
 * the password
 */
export class MissingPasswordUpdateException extends UserServiceInputException {
  /** Throws exception with message 'Por favor, informe tanto a nova senha quanto a senha atual'.
   *
   * Used when the user inputs only the current password
   * or the new password, but both are needed to update
   * the password
   */
  constructor() {
    super('Por favor, informe tanto a nova senha quanto a senha atual');
  }
}
