import { PaymentTypeEnum } from '@/shared/enum/payment-type.enum';

export interface ITransaction {
  id?: number;
  user_id: string;
  customer_cpf?: string;
  net_total: number;
  discounts?: number;
  gross_total?: number;
  payment_type: PaymentTypeEnum;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
