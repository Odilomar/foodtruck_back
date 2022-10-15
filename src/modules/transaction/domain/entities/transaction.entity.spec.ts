import { PaymentTypeEnum } from '@/shared/enum/payment-type.enum';
import { faker } from '@faker-js/faker';
import { ITransaction } from '../interfaces/transaction.interface';
import { TransactionEntity } from './transaction.entity';

describe('TransactionEntity', () => {
  const minimal: ITransaction = {
    id: faker.datatype.number(),
    user_id: faker.datatype.number(),
    net_total: faker.datatype.number(),
    payment_type: PaymentTypeEnum.CASH,
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  };

  it('should be defined', () => {
    expect(new TransactionEntity(minimal)).toBeDefined();
  });
  it('should create a Transaction with minimal information', () => {
    const Transaction = new TransactionEntity(minimal);

    expect(Transaction).toHaveProperty('id', minimal.id);
    expect(Transaction).toHaveProperty('user_id', minimal.user_id);
    expect(Transaction).toHaveProperty('net_total', minimal.net_total);
    expect(Transaction).toHaveProperty('payment_type', minimal.payment_type);
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
