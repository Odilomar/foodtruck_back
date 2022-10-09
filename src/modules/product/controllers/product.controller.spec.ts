import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductUseCase } from '../use-cases/create-product.use-case';
import { DeleteProductUseCase } from '../use-cases/delete-product.use-case';
import { FindOneProductUseCase } from '../use-cases/find-one-product.use-case';
import { FindProductUseCase } from '../use-cases/find-product.use-case';
import { UpdateProductUseCase } from '../use-cases/update-product.use-case';
import { ProductController } from './product.controller';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CreateProductUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteProductUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindOneProductUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindProductUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateProductUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
