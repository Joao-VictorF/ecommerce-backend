import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

let categoryArray: Category[] = [];

const PrismaServiceMock = {
  provide: PrismaService,
  useValue: {
    category: {
      create: jest.fn().mockImplementation(({ data }) => {
        categoryArray.push({ ...data });
        return categoryArray[categoryArray.length - 1];
      }),
      findUnique: jest.fn().mockImplementation(({ where }) => {
        return categoryArray.find((category) => {
          return category.id === where.id || category.name === where.name;
        });
      }),
      findMany: jest.fn().mockImplementation(() => {
        return categoryArray;
      }),
      update: jest.fn().mockImplementation(({ where, data }) => {
        const categoryIndex = categoryArray.findIndex((category) => {
          return category.id === where.id;
        });

        categoryArray[categoryIndex] = {
          ...categoryArray[categoryIndex],
          ...data,
        };

        return categoryArray[categoryIndex];
      }),
      delete: jest.fn().mockImplementation(({ where }) => {
        const categoryIndex = categoryArray.findIndex((category) => {
          return category.id === where.id;
        });

        categoryArray.splice(categoryIndex, 1);
      }),
    },
  },
} as Provider;

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, PrismaServiceMock],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    categoryArray = [];

    await categoryService.create({ name: 'Casa' });
    categoryArray[0].id = '1cd535db-fd49-4671-ab26-0f2b565e863a';

    await categoryService.create({ name: 'Madeira' });
    categoryArray[1].id = 'ec3b4cfc-5028-47c2-b631-970088efae5e';

    await categoryService.create({ name: 'Higiene' });
    categoryArray[2].id = '48e09976-5556-4b1f-b830-d480aec4299c';

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('create', () => {
    it('should create category', async () => {
      const category = await categoryService.create({ name: 'Categoria' });

      expect(category.name).toEqual('Categoria');
      expect(categoryArray.length).toEqual(4);
      expect(categoryArray[3].name).toEqual('Categoria');

      expect(prismaService.category.create).toHaveBeenCalledWith({
        data: { name: 'Categoria' },
      });
    });

    it('should create category with only first letter capitalized', async () => {
      const category = await categoryService.create({
        name: 'caTegoRia TeSte',
      });

      expect(category.name).toEqual('Categoria teste');
      expect(categoryArray.length).toEqual(4);
      expect(categoryArray[3].name).toEqual('Categoria teste');

      expect(prismaService.category.create).toHaveBeenCalledWith({
        data: { name: 'Categoria teste' },
      });
    });
  });

  describe('findAll', () => {
    it('should find all categories', async () => {
      const categories = await categoryService.findAll({});

      expect(categories).toEqual(categoryArray);
      expect(prismaService.category.findMany).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update category', async () => {
      const category = await categoryService.update(
        'ec3b4cfc-5028-47c2-b631-970088efae5e',
        { name: 'Madeira de lei' },
      );

      expect(category.id).toEqual('ec3b4cfc-5028-47c2-b631-970088efae5e');
      expect(category.name).toEqual('Madeira de lei');

      expect(prismaService.category.update).toHaveBeenCalledWith({
        where: { id: 'ec3b4cfc-5028-47c2-b631-970088efae5e' },
        data: { name: 'Madeira de lei' },
      });
    });

    it('should update category with name with only first letter capitalized', async () => {
      const category = await categoryService.update(
        'ec3b4cfc-5028-47c2-b631-970088efae5e',
        { name: 'maDeIrA De LEi' },
      );

      expect(category.id).toEqual('ec3b4cfc-5028-47c2-b631-970088efae5e');
      expect(category.name).toEqual('Madeira de lei');

      expect(prismaService.category.update).toHaveBeenCalledWith({
        where: { id: 'ec3b4cfc-5028-47c2-b631-970088efae5e' },
        data: { name: 'Madeira de lei' },
      });
    });
  });

  describe('remove', () => {
    it('should delete category', async () => {
      await categoryService.remove('ec3b4cfc-5028-47c2-b631-970088efae5e');

      expect(categoryArray.length).toEqual(2);

      expect(prismaService.category.delete).toHaveBeenCalledWith({
        where: { id: 'ec3b4cfc-5028-47c2-b631-970088efae5e' },
      });
    });
  });
});
