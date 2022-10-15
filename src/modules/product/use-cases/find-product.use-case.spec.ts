import { ProductTypeEnum } from '@/shared/enum/product-type.enum';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { FindProductDto } from '../dto/find-product.dto';
import { ProductModel } from '../infra/model/product.model';
import { ProductRepository } from '../infra/repositories/product.repository';
import { FindProductUseCase } from './find-product.use-case';

describe('FindProductUseCase', () => {
  let service: FindProductUseCase;

  const input = {
    search: faker.datatype.string(),
  } as FindProductDto;

  const product = {
    id: faker.datatype.number(),
    title: faker.datatype.string(),
    description: faker.datatype.string(),
    url: faker.datatype.string(),
    unit_price: faker.datatype.number(),
    type: ProductTypeEnum.DRINK,
    created_by_id: faker.datatype.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as ProductModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindProductUseCase,
        {
          provide: ProductRepository,
          useValue: {
            find: jest.fn().mockReturnValue([product]),
          },
        },
      ],
    }).compile();

    service = module.get<FindProductUseCase>(FindProductUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find products', async () => {
    const founded = await service.execute(input);

    expect(founded.length).toBeGreaterThan(0);
    expect(founded[0]).toHaveProperty('id', product.id);
  });
});
