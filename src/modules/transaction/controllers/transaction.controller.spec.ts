import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionUseCase } from '../use-cases/create-transaction.use-case';
import { DeleteTransactionUseCase } from '../use-cases/delete-transaction.use-case';
import { FindOneTransactionUseCase } from '../use-cases/find-one-transaction.use-case';
import { FindTransactionUseCase } from '../use-cases/find-transaction.use-case';
import { UpdateTransactionUseCase } from '../use-cases/update-transaction.use-case';
import { TransactionController } from './transaction.controller';

describe('TransactionController', () => {
  let controller: TransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CreateTransactionUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteTransactionUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindOneTransactionUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindTransactionUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateTransactionUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
      controllers: [TransactionController],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
