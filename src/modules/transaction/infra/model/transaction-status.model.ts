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
import { ITransactionStatus } from '../../domain/interfaces/transaction-status.interface';
import { TransactionStatusEnum } from '@/shared/enum/transaction-status.enum';
import { TransactionModel } from './transaction.model';

@Entity('transactions_status')
export class TransactionStatusModel implements ITransactionStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transaction_id: number;

  @Column({
    enum: TransactionStatusEnum,
    default: TransactionStatusEnum.CREATED,
  })
  status: TransactionStatusEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => TransactionModel, ({ id }: TransactionModel) => id)
  @JoinColumn({ name: 'transaction_id' })
  transaction: TransactionModel;
}
