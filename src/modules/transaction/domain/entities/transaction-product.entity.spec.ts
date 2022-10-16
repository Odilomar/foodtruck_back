import { faker } from '@faker-js/faker';
import { ITransactionProduct } from '../interfaces/transaction-product.interface';
import { TransactionProductEntity } from './transaction-product.entity';

describe('TransactionProductEntity', () => {
  const minimal: ITransactionProduct = {
    id: faker.datatype.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
    transaction_id: faker.datatype.number(),
    product_id: faker.datatype.number(),
    unit_price: faker.datatype.number(),
  };

  it('should be defined', () => {
    expect(new TransactionProductEntity(minimal)).toBeDefined();
  });
  it('should create a TransactionProduct with minimal information', () => {
    const transactionProduct = new TransactionProductEntity(minimal);

    expect(transactionProduct).toHaveProperty('id', minimal.id);
    expect(transactionProduct).toHaveProperty(
      'transaction_id',
      minimal.transaction_id,
    );
    expect(transactionProduct).toHaveProperty('product_id', minimal.product_id);
    expect(transactionProduct).toHaveProperty('unit_price', minimal.unit_price);
    expect(transactionProduct).toHaveProperty('created_at', minimal.created_at);
    expect(transactionProduct).toHaveProperty('updated_at', minimal.updated_at);
  });
  it('should create a TransactionProduct with deleted_at', () => {
    const deleted_at = faker.date.future();
    const transactionProduct = new TransactionProductEntity({
      ...minimal,
      deleted_at,
    });

    expect(transactionProduct).toHaveProperty('deleted_at', deleted_at);
  });
});
