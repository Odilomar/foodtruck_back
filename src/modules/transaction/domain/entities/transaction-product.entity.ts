import { customDateFactory } from '@/shared/utils/custom-date';
import { EntityValidator } from '@/shared/validators/class-validator-fields';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { ITransactionProduct } from '../interfaces/transaction-product.interface';

export class TransactionProductEntity implements ITransactionProduct {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  transaction_id: number;

  @IsNumber()
  product_id: number;

  @IsNumber()
  unit_price: number;

  @IsDate()
  @IsOptional()
  created_at?: Date;

  @IsDate()
  @IsOptional()
  updated_at?: Date;

  @IsDate()
  @IsOptional()
  deleted_at?: Date;

  constructor({
    id,
    transaction_id,
    product_id,
    unit_price,
    created_at,
    updated_at,
    deleted_at,
  }: Partial<ITransactionProduct>) {
    this.id = id;
    this.transaction_id = transaction_id;
    this.product_id = product_id;
    this.unit_price = unit_price;
    this.created_at =
      (created_at && customDateFactory(created_at)) || customDateFactory();
    this.updated_at =
      (updated_at && customDateFactory(updated_at)) || customDateFactory();
    this.deleted_at = deleted_at;

    this.validate();
  }

  validate(): void {
    const validator = new EntityValidator(this);
    validator.validate('transactionproduct');
  }
}
