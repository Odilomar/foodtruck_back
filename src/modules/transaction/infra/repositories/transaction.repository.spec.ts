import { PaymentTypeEnum } from '@/shared/enum/payment-type.enum';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InsertResult, UpdateResult } from 'typeorm';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { TransactionModel } from '../model/transaction.model';
import { TransactionRepository } from './transaction.repository';

describe('TransactionRepository', () => {
  let service: TransactionRepository;

  const transaction = {
    id: faker.datatype.number(),
    net_total: faker.datatype.number(),
    payment_type: PaymentTypeEnum.CASH,
    user_id: faker.datatype.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as TransactionModel;

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

  let newtransaction: TransactionModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionRepository,
        {
          provide: getRepositoryToken(TransactionModel),
          useValue: {
            find: jest.fn().mockReturnValue([transaction]),
            findOne: jest.fn().mockReturnValue(transaction),
            create: jest.fn().mockReturnValue(new TransactionModel()),
            save: jest.fn().mockReturnValue(transaction),
            insert: jest.fn().mockReturnValue(insertResult),
            update: jest.fn().mockReturnValue(updateResult),
            softDelete: jest.fn().mockReturnValue(updateResult),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionRepository>(TransactionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a TransactionModel instance', async () => {
    newtransaction = await service.create(transaction as TransactionEntity);

    expect(newtransaction).toBeInstanceOf(TransactionModel);
  });

  it('should save a transaction', async () => {
    newtransaction = await service.save(transaction);

    expect(newtransaction).toHaveProperty('id', transaction.id);
  });

  it('should insert a transaction', async () => {
    const insertedResult = await service.insert(transaction);

    expect(insertedResult).toHaveProperty('raw', insertResult.raw);
  });

  it('should update a transaction', async () => {
    const updatedResult = await service.update(
      { id: transaction.id },
      transaction,
    );

    expect(updatedResult).toHaveProperty('raw', updateResult.raw);
  });

  it('should softDelete a transaction', async () => {
    const deletedResult = await service.delete(transaction.id);

    expect(deletedResult).toHaveProperty('raw', deletedResult.raw);
  });

  it('should find transactions', async () => {
    const transactions = await service.find();

    expect(transactions.length).toBeGreaterThan(0);
    expect(transactions[0]).toHaveProperty('id', transaction.id);
  });

  it('should find one transaction', async () => {
    const found = await service.findOne({ where: { id: transaction.id } });

    expect(found).toBeDefined();
    expect(found).toHaveProperty('id', transaction.id);
  });
});
