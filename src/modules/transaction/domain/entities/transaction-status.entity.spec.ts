import { TransactionStatusEnum } from '@/shared/enum/transaction-status.enum';
import { faker } from '@faker-js/faker';
import { ITransactionStatus } from '../interfaces/transaction-status.interface';
import { TransactionStatusEntity } from './transaction-status.entity';

describe('TransactionStatusEntity', () => {
  const minimal: ITransactionStatus = {
    id: faker.datatype.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
    transaction_id: faker.datatype.number(),
    status: TransactionStatusEnum.CREATED,
  };

  it('should be defined', () => {
    expect(new TransactionStatusEntity(minimal)).toBeDefined();
  });
  it('should create a TransactionStatus with minimal information', () => {
    const transactionStatus = new TransactionStatusEntity(minimal);

    expect(transactionStatus).toHaveProperty('id', minimal.id);
    expect(transactionStatus).toHaveProperty(
      'transaction_id',
      minimal.transaction_id,
    );
    expect(transactionStatus).toHaveProperty('status', minimal.status);
    expect(transactionStatus).toHaveProperty('created_at', minimal.created_at);
    expect(transactionStatus).toHaveProperty('updated_at', minimal.updated_at);
  });
  it('should create a TransactionStatus with deleted_at', () => {
    const deleted_at = faker.date.future();
    const transactionStatus = new TransactionStatusEntity({
      ...minimal,
      deleted_at,
    });

    expect(transactionStatus).toHaveProperty('deleted_at', deleted_at);
  });
});
