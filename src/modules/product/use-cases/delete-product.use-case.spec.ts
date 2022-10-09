import { ProductTypeEnum } from '@/modules/shared/enum/product-type.enum';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { DeleteProductDto } from '../dto/delete-product.dto';
import { ProductModel } from '../infra/model/product.model';
import { ProductRepository } from '../infra/repositories/product.repository';
import { DeleteProductUseCase } from './delete-product.use-case';

describe('DeleteProductUseCase', () => {
  let service: DeleteProductUseCase;
  let provider: ProductRepository;

  const input = {
    id: faker.datatype.number(),
  } as DeleteProductDto;

  const product = {
    ...input,
    title: faker.datatype.string(),
    description: faker.datatype.string(),
    url: faker.datatype.string(),
    unit_price: faker.datatype.number(),
    type: ProductTypeEnum.DRINK,
    created_by_id: faker.datatype.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as ProductModel;

  const deleteResult = {
    raw: 1,
  } as DeleteResult;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteProductUseCase,
        {
          provide: ProductRepository,
          useValue: {
            findOne: jest.fn().mockReturnValue(product),
            delete: jest.fn().mockReturnValue(deleteResult),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteProductUseCase>(DeleteProductUseCase);
    provider = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete a product', async () => {
    const deletedProduct = await service.execute(input);

    expect(deletedProduct).toHaveProperty('raw', deleteResult.raw);
  });

  it('should throw error when product is not found', async () => {
    jest.spyOn(provider, 'findOne').mockReturnValue(null);

    await expect(service.execute(input)).rejects.toThrow(
      new NotFoundException('Product not found!'),
    );
  });
});
