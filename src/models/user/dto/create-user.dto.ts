import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';

/** Describes the fields needed to create an User */
export class CreateUserDto implements User {
  /**
   * User email
   * @example "user@example.com"
   */
  @IsEmail({ message: 'Informe um e-mail válido' })
  email: string;

  /**
   * User password must contain at least 1 number and 1 letter
   * @example "abc123456"
   */
  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/i, {
    message: 'A senha deve conter pelo menos 1 número e 1 letra.',
  })
  password: string;

  /**
   * User name
   * @example "John Doe"
   */
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * User address
   * @example "World Street 0"
   */
  @IsString()
  @IsOptional()
  address?: string;
}
