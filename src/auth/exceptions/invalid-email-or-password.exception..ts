import { AuthServiceInputException } from './auth-service-input.exception';

/** Used when the user inputs the wrong email
 * or password when trying to login
 */
export class InvalidEmailOrPasswordException extends AuthServiceInputException {
  /** Throws exception with message 'E-mail ou senha incorretos'.
   *
   * Used when the user inputs the wrong email
   * or password when trying to login
   */
  constructor() {
    super('E-mail ou senha incorretos');
  }
}
