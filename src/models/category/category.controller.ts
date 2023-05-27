import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { IsAdmin } from 'src/common/decorators/is-admin.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoriesDto } from './dto/find-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

/** Exposes category CRUD endpoints */
@ApiTags('category')
@Controller('category')
export class CategoryController {
  /** Exposes category CRUD endpoints
   *
   * Instantiate class and CategoryService dependency
   */
  constructor(private readonly categoryService: CategoryService) {}

  /** Creates a new category, only for admins */
  @ApiOperation({ summary: 'Admin creates a new category' })
  @IsAdmin()
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  /** Returns all categories
   *
   * searching and ordering by name
   */
  @ApiOperation({ summary: 'Returns all categories' })
  @Public()
  @Get()
  async findAll(
    @Query() findCategoriesDto: FindCategoriesDto,
  ): Promise<Category[]> {
    return this.categoryService.findAll(findCategoriesDto);
  }

  /** Updates category information, only for admins */
  @ApiOperation({ summary: 'Admin updates category' })
  @IsAdmin()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  /** Deletes category from database, only for admins */
  @ApiOperation({ summary: 'Admin deletes category' })
  @IsAdmin()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.remove(id);
  }
}
