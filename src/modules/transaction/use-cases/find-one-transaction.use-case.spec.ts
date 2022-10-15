import { PaymentTypeEnum } from '@/shared/enum/payment-type.enum';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { FindOneTransactionDto } from '../dto/find-one-transaction.dto';
import { TransactionModel } from '../infra/model/transaction.model';
import { TransactionRepository } from '../infra/repositories/transaction.repository';
import { FindOneTransactionUseCase } from './find-one-transaction.use-case';

describe('FindOneTransactionUseCase', () => {
  let service: FindOneTransactionUseCase;

  const input = {
    id: faker.datatype.number(),
  } as FindOneTransactionDto;

  const transaction = {
    ...input,
    net_total: faker.datatype.number(),
    payment_type: PaymentTypeEnum.CASH,
    user_id: faker.datatype.number(),
  } as TransactionModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneTransactionUseCase,
        {
          provide: TransactionRepository,
          useValue: {
            findOne: jest.fn().mockReturnValue(transaction),
          },
        },
      ],
    }).compile();

    service = module.get<FindOneTransactionUseCase>(FindOneTransactionUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find one transaction', async () => {
    const founded = await service.execute(input);

    expect(founded).toHaveProperty('net_total', transaction.net_total);
    expect(founded).toHaveProperty('payment_type', transaction.payment_type);
    expect(founded).toHaveProperty('user_id', transaction.user_id);
  });
});
