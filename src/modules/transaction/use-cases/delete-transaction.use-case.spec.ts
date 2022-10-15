import { PaymentTypeEnum } from '@/shared/enum/payment-type.enum';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { DeleteTransactionDto } from '../dto/delete-transaction.dto';
import { TransactionModel } from '../infra/model/transaction.model';
import { TransactionRepository } from '../infra/repositories/transaction.repository';
import { DeleteTransactionUseCase } from './delete-product.use-case';

describe('DeleteTransactionUseCase', () => {
  let service: DeleteTransactionUseCase;
  let provider: TransactionRepository;

  const input = {
    id: faker.datatype.number(),
  } as DeleteTransactionDto;

  const transaction = {
    ...input,
    net_total: faker.datatype.number(),
    payment_type: PaymentTypeEnum.CASH,
    user_id: faker.datatype.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as TransactionModel;

  const deleteResult = {
    raw: 1,
  } as DeleteResult;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTransactionUseCase,
        {
          provide: TransactionRepository,
          useValue: {
            findOne: jest.fn().mockReturnValue(transaction),
            delete: jest.fn().mockReturnValue(deleteResult),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteTransactionUseCase>(DeleteTransactionUseCase);
    provider = module.get<TransactionRepository>(TransactionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete a transaction', async () => {
    const deletedTransaction = await service.execute(input);

    expect(deletedTransaction).toHaveProperty('raw', deleteResult.raw);
  });

  it('should throw error when transaction is not found', async () => {
    jest.spyOn(provider, 'findOne').mockReturnValue(null);

    await expect(service.execute(input)).rejects.toThrow(
      new NotFoundException('Transaction not found!'),
    );
  });
});
