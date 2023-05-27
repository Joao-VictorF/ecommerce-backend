import { AuthServiceInputException } from './auth-service-input.exception';

/** Used when the user inputs an invalid token
 * when refreshing
 */
export class InvalidRefreshTokenException extends AuthServiceInputException {
  /** Throws exception with message 'Refresh Token Inválido'.
   *
   * Used when the user inputs an invalid token
   * when refreshing
   */
  constructor() {
    super('Refresh Token Inválido');
  }
}
