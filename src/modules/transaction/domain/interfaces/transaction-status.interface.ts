import { TransactionStatusEnum } from '@/shared/enum/transaction-status.enum';

export interface ITransactionStatus {
  id?: number;
  transaction_id: number;
  status: TransactionStatusEnum;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
