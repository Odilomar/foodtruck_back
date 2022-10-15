import { PaymentTypeEnum } from '@/shared/enum/payment-type.enum';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { FindTransactionDto } from '../dto/find-transaction.dto';
import { TransactionModel } from '../infra/model/transaction.model';
import { TransactionRepository } from '../infra/repositories/transaction.repository';
import { FindTransactionUseCase } from './find-transaction.use-case';

describe('FindTransactionUseCase', () => {
  let service: FindTransactionUseCase;

  const input = {
    search: faker.datatype.string(),
  } as FindTransactionDto;

  const product = {
    id: faker.datatype.number(),
    net_total: faker.datatype.number(),
    payment_type: PaymentTypeEnum.CASH,
    user_id: faker.datatype.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as TransactionModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindTransactionUseCase,
        {
          provide: TransactionRepository,
          useValue: {
            find: jest.fn().mockReturnValue([product]),
          },
        },
      ],
    }).compile();

    service = module.get<FindTransactionUseCase>(FindTransactionUseCase);
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
