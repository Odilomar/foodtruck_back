import { ProductTypeEnum } from '@/modules/shared/enum/product-type.enum';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { FindOneProductDto } from '../dto/find-one-product.dto';
import { ProductModel } from '../infra/model/product.model';
import { ProductRepository } from '../infra/repositories/product.repository';
import { FindOneProductUseCase } from './find-one-product.use-case';

describe('FindOneProductUseCase', () => {
  let service: FindOneProductUseCase;

  const input = {
    id: faker.datatype.number(),
  } as FindOneProductDto;

  const product = {
    ...input,
    title: faker.datatype.string(),
    description: faker.datatype.string(),
    url: faker.datatype.string(),
    unit_price: faker.datatype.number(),
    type: ProductTypeEnum.DRINK,
    created_by_id: faker.datatype.number(),
  } as ProductModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneProductUseCase,
        {
          provide: ProductRepository,
          useValue: {
            findOne: jest.fn().mockReturnValue(product),
          },
        },
      ],
    }).compile();

    service = module.get<FindOneProductUseCase>(FindOneProductUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find one product', async () => {
    const founded = await service.execute(input);

    expect(founded).toHaveProperty('title', product.title);
    expect(founded).toHaveProperty('description', product.description);
    expect(founded).toHaveProperty('url', product.url);
    expect(founded).toHaveProperty('unit_price', product.unit_price);
  });
});
