export interface ITransactionProduct {
  id?: number;
  transaction_id: number;
  product_id: number;
  unit_price: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
