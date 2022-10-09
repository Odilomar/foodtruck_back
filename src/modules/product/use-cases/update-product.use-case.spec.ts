import { ProductTypeEnum } from '@/modules/shared/enum/product-type.enum';
import { faker } from '@faker-js/faker';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { cpf } from 'cpf-cnpj-validator';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductModel } from '../infra/model/product.model';
import { ProductRepository } from '../infra/repositories/product.repository';
import { UpdateProductUseCase } from './update-product.use-case';

describe('UpdateProductUseCase', () => {
  let service: UpdateProductUseCase;
  let provider: ProductRepository;

  const input = {
    title: faker.datatype.string(),
    description: faker.datatype.string(),
    url: faker.datatype.string(),
    unit_price: faker.datatype.number(),
    type: ProductTypeEnum.DRINK,
    created_by_id: faker.datatype.number(),
    id: faker.datatype.number(),
  } as UpdateProductDto;

  const product = {
    ...input,
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as ProductModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProductUseCase,
        {
          provide: ProductRepository,
          useValue: {
            save: jest.fn().mockReturnValue(product),
            findOne: jest.fn().mockReturnValue(product),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateProductUseCase>(UpdateProductUseCase);
    provider = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a product', async () => {
    const updatedProduct = await service.execute(input);

    expect(updatedProduct).toHaveProperty('title', input.title);
    expect(updatedProduct).toHaveProperty('description', input.description);
    expect(updatedProduct).toHaveProperty('url', input.url);
    expect(updatedProduct).toHaveProperty('unit_price', input.unit_price);
  });

  it('should throw error when product is not found', async () => {
    jest.spyOn(provider, 'findOne').mockReturnValue(null);

    await expect(service.execute(input)).rejects.toThrow(
      new NotFoundException('Product not found!'),
    );
  });
});
