import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from 'src/auth/public.decorator';
import { IsAdmin } from 'src/common/decorators/is-admin.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithoutPassword } from './entities/user-without-password.entity';
import { UserService } from './user.service';

/** Exposes user CRUD endpoints */
@ApiTags('user')
@Controller('user')
export class UserController {
  /** Exposes user CRUD endpoints
   *
   * Instantiate class and UserService dependency
   */
  constructor(private readonly userService: UserService) {}

  /** Creates a new user */
  @ApiOperation({ summary: 'Creates a new user' })
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.create(createUserDto);
  }

  /** Admin creates new admin */
  @ApiOperation({ summary: 'Admin creates new admin' })
  @IsAdmin()
  @Post('admin')
  createAdmin(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.createAdmin(createUserDto);
  }

  /** Returns user's own profile information without password */
  @ApiOperation({ summary: "Gets user's own profile" })
  @ApiBearerAuth()
  @Get('profile')
  async findById(@Req() request: Request): Promise<UserWithoutPassword> {
    const userId = request.user['userId'];

    return this.userService.findById(userId);
  }

  /** Returns user's information without password */
  @ApiOperation({ summary: "Gets user's own profile" })
  @IsAdmin()
  @Get()
  async list(): Promise<Array<UserWithoutPassword>> {
    return this.userService.list();
  }

  /** Updates user information */
  @ApiOperation({ summary: 'Updates user' })
  @ApiBearerAuth()
  @Patch()
  update(
    @Req() request: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    const userId = request.user['userId'];

    return this.userService.update(userId, updateUserDto);
  }

  /** Deletes user and all user related information from the system */
  @ApiOperation({ summary: 'Deletes user' })
  @ApiBearerAuth()
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Req() request: Request,
    @Body() deleteUserDto: DeleteUserDto,
  ): Promise<void> {
    const userId = request.user['userId'];

    return this.userService.remove(userId, deleteUserDto);
  }
}
