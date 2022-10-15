import { PaymentTypeEnum } from '@/shared/enum/payment-type.enum';
import { customDateFactory } from '@/shared/utils/custom-date';
import { EntityValidator } from '@/shared/validators/class-validator-fields';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ITransaction } from '../interfaces/transaction.interface';

export class TransactionEntity implements ITransaction {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  user_id: number;

  @IsString()
  @IsOptional()
  customer_cpf?: string;

  @IsNumber()
  net_total: number;

  @IsNumber()
  @IsOptional()
  discounts?: number;

  @IsNumber()
  @IsOptional()
  gross_total?: number;

  @IsEnum(PaymentTypeEnum)
  payment_type: PaymentTypeEnum;

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
    user_id,
    customer_cpf,
    net_total,
    discounts,
    gross_total,
    payment_type,
    created_at,
    updated_at,
    deleted_at,
  }: Partial<ITransaction>) {
    this.id = id;
    this.user_id = user_id;
    this.customer_cpf = customer_cpf;
    this.net_total = net_total;
    this.discounts = discounts;
    this.gross_total = gross_total;
    this.payment_type = payment_type;
    this.created_at =
      (created_at && customDateFactory(created_at)) || customDateFactory();
    this.updated_at =
      (updated_at && customDateFactory(updated_at)) || customDateFactory();
    this.deleted_at = deleted_at;

    this.validate();
  }

  validate(): void {
    const validator = new EntityValidator(this);
    validator.validate('transaction');
  }
}
