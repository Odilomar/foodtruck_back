import { TransactionStatusEnum } from '@/shared/enum/transaction-status.enum';
import { customDateFactory } from '@/shared/utils/custom-date';
import { EntityValidator } from '@/shared/validators/class-validator-fields';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ITransactionStatus } from '../interfaces/transaction-status.interface';

export class TransactionStatusEntity implements ITransactionStatus {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  transaction_id: number;

  @IsEnum(TransactionStatusEnum)
  status: TransactionStatusEnum;

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
    status,
    created_at,
    updated_at,
    deleted_at,
  }: Partial<ITransactionStatus>) {
    this.id = id;
    this.transaction_id = transaction_id;
    this.status = status;
    this.created_at =
      (created_at && customDateFactory(created_at)) || customDateFactory();
    this.updated_at =
      (updated_at && customDateFactory(updated_at)) || customDateFactory();
    this.deleted_at = deleted_at;

    this.validate();
  }

  validate(): void {
    const validator = new EntityValidator(this);
    validator.validate('transactionstatus');
  }
}
