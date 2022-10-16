import { ProductModel } from '@/modules/product/infra/model/product.model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ITransactionProduct } from '../../domain/interfaces/transaction-product.interface';
import { TransactionModel } from './transaction.model';

@Entity('transactions_products')
export class TransactionProductModel implements ITransactionProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transaction_id: number;

  @Column()
  product_id: number;

  @Column()
  unit_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => TransactionModel, ({ id }: TransactionModel) => id)
  @JoinColumn({ name: 'transaction_id' })
  transaction: TransactionModel;

  @ManyToOne(() => ProductModel, ({ id }: ProductModel) => id)
  @JoinColumn({ name: 'product_id' })
  product: ProductModel;
}
