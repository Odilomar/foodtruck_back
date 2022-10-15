import { PaymentTypeEnum } from '@/shared/enum/payment-type.enum';
import { TransactionStatusEnum } from '@/shared/enum/transaction-status.enum';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionStatusModel } from '../infra/model/transaction-status.model';
import { TransactionModel } from '../infra/model/transaction.model';
import { TransactionStatusRepository } from '../infra/repositories/transaction-status.repository';
import { TransactionRepository } from '../infra/repositories/transaction.repository';
import { CreateTransactionUseCase } from './create-transaction.use-case';

describe('CreateTransactionUseCase', () => {
  let service: CreateTransactionUseCase;

  const input = {
    net_total: faker.datatype.number(),
    payment_type: PaymentTypeEnum.CASH,
    user_id: faker.datatype.number(),
  } as CreateTransactionDto;

  const transaction = {
    ...input,
    id: faker.datatype.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as TransactionModel;

  const transactionStatus = {
    transaction_id: transaction.id,
    status: TransactionStatusEnum.CREATED,
    id: faker.datatype.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as TransactionStatusModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionUseCase,
        {
          provide: TransactionRepository,
          useValue: {
            save: jest.fn().mockReturnValue(transaction),
          },
        },
        {
          provide: TransactionStatusRepository,
          useValue: {
            save: jest.fn().mockReturnValue(transactionStatus),
          },
        },
      ],
    }).compile();

    service = module.get<CreateTransactionUseCase>(CreateTransactionUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new transaction', async () => {
    const createdTransaction = await service.execute(input);

    expect(createdTransaction).toHaveProperty('net_total', input.net_total);
    expect(createdTransaction).toHaveProperty(
      'payment_type',
      input.payment_type,
    );
    expect(createdTransaction).toHaveProperty('user_id', input.user_id);
  });

  it('should throw error on create transaction without net_total', async () => {
    await expect(
      service.execute({
        ...input,
        net_total: null,
      }),
    ).rejects.toThrowError();
  });

  it('should throw error on create transaction without payment_type', async () => {
    await expect(
      service.execute({
        ...input,
        payment_type: null,
      }),
    ).rejects.toThrowError();
  });

  it('should throw error on create transaction without user_id', async () => {
    await expect(
      service.execute({
        ...input,
        user_id: null,
      }),
    ).rejects.toThrowError();
  });
});
