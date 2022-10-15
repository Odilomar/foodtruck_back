import { PaymentTypeEnum } from '@/shared/enum/payment-type.enum';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionModel } from '../infra/model/transaction.model';
import { TransactionRepository } from '../infra/repositories/transaction.repository';
import { UpdateTransactionUseCase } from './update-transaction.use-case';

describe('UpdateTransactionUseCase', () => {
  let service: UpdateTransactionUseCase;
  let provider: TransactionRepository;

  const input = {
    net_total: faker.datatype.number(),
    payment_type: PaymentTypeEnum.CASH,
    user_id: faker.datatype.number(),
    id: faker.datatype.number(),
  } as UpdateTransactionDto;

  const product = {
    ...input,
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as TransactionModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTransactionUseCase,
        {
          provide: TransactionRepository,
          useValue: {
            save: jest.fn().mockReturnValue(product),
            findOne: jest.fn().mockReturnValue(product),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateTransactionUseCase>(UpdateTransactionUseCase);
    provider = module.get<TransactionRepository>(TransactionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a product', async () => {
    const updatedTransaction = await service.execute(input);

    expect(updatedTransaction).toHaveProperty('net_total', input.net_total);
    expect(updatedTransaction).toHaveProperty(
      'payment_type',
      input.payment_type,
    );
    expect(updatedTransaction).toHaveProperty('user_id', input.user_id);
  });

  it('should throw error when product is not found', async () => {
    jest.spyOn(provider, 'findOne').mockReturnValue(null);

    await expect(service.execute(input)).rejects.toThrow(
      new NotFoundException('Transaction not found!'),
    );
  });
});
