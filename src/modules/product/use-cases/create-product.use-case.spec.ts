import { ProductTypeEnum } from '@/shared/enum/product-type.enum';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductModel } from '../infra/model/product.model';
import { ProductRepository } from '../infra/repositories/product.repository';
import { CreateProductUseCase } from './create-product.use-case';

describe('CreateProductUseCase', () => {
  let service: CreateProductUseCase;

  const input = {
    title: faker.datatype.string(),
    description: faker.datatype.string(),
    url: faker.datatype.string(),
    unit_price: faker.datatype.number(),
    type: ProductTypeEnum.DRINK,
    created_by_id: faker.datatype.number(),
  } as CreateProductDto;

  const product = {
    ...input,
    id: faker.datatype.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as ProductModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        {
          provide: ProductRepository,
          useValue: {
            save: jest.fn().mockReturnValue(product),
          },
        },
      ],
    }).compile();

    service = module.get<CreateProductUseCase>(CreateProductUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new product', async () => {
    const createdProduct = await service.execute(input);

    expect(createdProduct).toHaveProperty('title', input.title);
    expect(createdProduct).toHaveProperty('description', input.description);
    expect(createdProduct).toHaveProperty('url', input.url);
    expect(createdProduct).toHaveProperty('unit_price', input.unit_price);
  });

  it('should throw error on create product without title', async () => {
    await expect(
      service.execute({
        ...input,
        title: null,
      }),
    ).rejects.toThrowError();
  });

  it('should throw error on create product without description', async () => {
    await expect(
      service.execute({
        ...input,
        description: null,
      }),
    ).rejects.toThrowError();
  });

  it('should throw error on create product without url', async () => {
    await expect(
      service.execute({
        ...input,
        url: null,
      }),
    ).rejects.toThrowError();
  });

  it('should throw error on create product without unit_price', async () => {
    await expect(
      service.execute({
        ...input,
        unit_price: null,
      }),
    ).rejects.toThrowError();
  });
});
