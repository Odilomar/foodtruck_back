import { TransactionStatusEnum } from '@/shared/enum/transaction-status.enum';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InsertResult, UpdateResult } from 'typeorm';
import { TransactionStatusEntity } from '../../domain/entities/transaction-status.entity';
import { TransactionStatusModel } from '../model/transaction-status.model';
import { TransactionStatusRepository } from './transaction-status.repository';

describe('TransactionStatusRepository', () => {
  let service: TransactionStatusRepository;

  const transaction = {
    id: faker.datatype.number(),
    transaction_id: faker.datatype.number(),
    status: TransactionStatusEnum.CREATED,
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as TransactionStatusModel;

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

  let newtransaction: TransactionStatusModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionStatusRepository,
        {
          provide: getRepositoryToken(TransactionStatusModel),
          useValue: {
            find: jest.fn().mockReturnValue([transaction]),
            findOne: jest.fn().mockReturnValue(transaction),
            create: jest.fn().mockReturnValue(new TransactionStatusModel()),
            save: jest.fn().mockReturnValue(transaction),
            insert: jest.fn().mockReturnValue(insertResult),
            update: jest.fn().mockReturnValue(updateResult),
            softDelete: jest.fn().mockReturnValue(updateResult),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionStatusRepository>(
      TransactionStatusRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a TransactionStatusModel instance', async () => {
    newtransaction = await service.create(
      transaction as unknown as TransactionStatusEntity,
    );

    expect(newtransaction).toBeInstanceOf(TransactionStatusModel);
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
