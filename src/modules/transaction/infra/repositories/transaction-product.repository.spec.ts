import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InsertResult, UpdateResult } from 'typeorm';
import { TransactionProductEntity } from '../../domain/entities/transaction-product.entity';
import { TransactionProductModel } from '../model/transaction-product.model';
import { TransactionProductRepository } from './transaction-product.repository';

describe('TransactionProductRepository', () => {
  let service: TransactionProductRepository;

  const transactionProduct = {
    id: faker.datatype.number(),
    transaction_id: faker.datatype.number(),
    product_id: faker.datatype.number(),
    unit_price: faker.datatype.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as TransactionProductModel;

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

  let newtransactionProduct: TransactionProductModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionProductRepository,
        {
          provide: getRepositoryToken(TransactionProductModel),
          useValue: {
            find: jest.fn().mockReturnValue([transactionProduct]),
            findOne: jest.fn().mockReturnValue(transactionProduct),
            create: jest.fn().mockReturnValue(new TransactionProductModel()),
            save: jest.fn().mockReturnValue(transactionProduct),
            insert: jest.fn().mockReturnValue(insertResult),
            update: jest.fn().mockReturnValue(updateResult),
            softDelete: jest.fn().mockReturnValue(updateResult),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionProductRepository>(
      TransactionProductRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a TransactionProductModel instance', async () => {
    newtransactionProduct = await service.create(
      transactionProduct as unknown as TransactionProductEntity,
    );

    expect(newtransactionProduct).toBeInstanceOf(TransactionProductModel);
  });

  it('should save a transactionProduct', async () => {
    newtransactionProduct = await service.save(transactionProduct);

    expect(newtransactionProduct).toHaveProperty('id', transactionProduct.id);
  });

  it('should insert a transactionProduct', async () => {
    const insertedResult = await service.insert(transactionProduct);

    expect(insertedResult).toHaveProperty('raw', insertResult.raw);
  });

  it('should update a transactionProduct', async () => {
    const updatedResult = await service.update(
      { id: transactionProduct.id },
      transactionProduct,
    );

    expect(updatedResult).toHaveProperty('raw', updateResult.raw);
  });

  it('should softDelete a transactionProduct', async () => {
    const deletedResult = await service.delete(transactionProduct.id);

    expect(deletedResult).toHaveProperty('raw', deletedResult.raw);
  });

  it('should find transactionProducts', async () => {
    const transactionProducts = await service.find();

    expect(transactionProducts.length).toBeGreaterThan(0);
    expect(transactionProducts[0]).toHaveProperty('id', transactionProduct.id);
  });

  it('should find one transactionProduct', async () => {
    const found = await service.findOne({
      where: { id: transactionProduct.id },
    });

    expect(found).toBeDefined();
    expect(found).toHaveProperty('id', transactionProduct.id);
  });
});
