import { TransactionStatusEnum } from '@/shared/enum/transaction-status.enum';
import { faker } from '@faker-js/faker';
import { ITransactionStatus } from '../interfaces/transaction-status.interface';
import { TransactionEntity } from './transaction.entity';

describe('TransactionEntity', () => {
  const minimal: ITransactionStatus = {
    id: faker.datatype.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
    transaction_id: faker.datatype.number(),
    status: TransactionStatusEnum.CREATED,
  };

  it('should be defined', () => {
    expect(new TransactionEntity(minimal)).toBeDefined();
  });
  it('should create a Transaction with minimal information', () => {
    const Transaction = new TransactionEntity(minimal);

    expect(Transaction).toHaveProperty('id', minimal.id);
    expect(Transaction).toHaveProperty(
      'transaction_id',
      minimal.transaction_id,
    );
    expect(Transaction).toHaveProperty('status', minimal.status);
    expect(Transaction).toHaveProperty('created_at', minimal.created_at);
    expect(Transaction).toHaveProperty('updated_at', minimal.updated_at);
  });
  it('should create a Transaction with deleted_at', () => {
    const deleted_at = faker.date.future();
    const Transaction = new TransactionEntity({
      ...minimal,
      deleted_at,
    });

    expect(Transaction).toHaveProperty('deleted_at', deleted_at);
  });
});
