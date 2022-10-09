import { ProductTypeEnum } from '@/modules/shared/enum/product-type.enum';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InsertResult, UpdateResult } from 'typeorm';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductModel } from '../model/product.model';
import { ProductRepository } from './product.repository';

describe('ProductRepository', () => {
  let service: ProductRepository;

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

  const insertResult = {
    generatedMaps: [],
    identifiers: [],
    raw: 1,
  } as InsertResult;

  const updateResult = {
    generatedMaps: [],
    identifiers: [],
    raw: 1,
  } as UpdateResult;

  let newproduct: ProductModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        {
          provide: getRepositoryToken(ProductModel),
          useValue: {
            find: jest.fn().mockReturnValue([product]),
            findOne: jest.fn().mockReturnValue(product),
            create: jest.fn().mockReturnValue(new ProductModel()),
            save: jest.fn().mockReturnValue(product),
            insert: jest.fn().mockReturnValue(insertResult),
            update: jest.fn().mockReturnValue(updateResult),
            softDelete: jest.fn().mockReturnValue(updateResult),
          },
        },
      ],
    }).compile();

    service = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a ProductModel instance', async () => {
    newproduct = await service.create(product as ProductEntity);

    expect(newproduct).toBeInstanceOf(ProductModel);
  });

  it('should save a product', async () => {
    newproduct = await service.save(product);

    expect(newproduct).toHaveProperty('id', product.id);
  });

  it('should insert a product', async () => {
    const insertedResult = await service.insert(product);

    expect(insertedResult).toHaveProperty('raw', insertResult.raw);
  });

  it('should update a product', async () => {
    const updatedResult = await service.update({ id: product.id }, product);

    expect(updatedResult).toHaveProperty('raw', updateResult.raw);
  });

  it('should softDelete a product', async () => {
    const deletedResult = await service.delete(product.id);

    expect(deletedResult).toHaveProperty('raw', deletedResult.raw);
  });

  it('should find products', async () => {
    const products = await service.find();

    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('id', product.id);
  });

  it('should find one product', async () => {
    const found = await service.findOne({ where: { id: product.id } });

    expect(found).toBeDefined();
    expect(found).toHaveProperty('id', product.id);
  });
});
