import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ITransaction } from '../../domain/interfaces/transaction.interface';
import { PaymentTypeEnum } from '@/shared/enum/payment-type.enum';
import { UserModel } from '@/modules/user/infra/model/user.model';
import { TransactionStatusModel } from './transaction-status.model';

@Entity('transactions')
export class TransactionModel implements ITransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  customer_cpf?: string;

  @Column()
  net_total: number;

  @Column({ nullable: true, default: 0 })
  discounts?: number;

  @Column({ nullable: true, default: 0 })
  gross_total?: number;

  @Column({ enum: PaymentTypeEnum, default: PaymentTypeEnum.CASH })
  payment_type: PaymentTypeEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => UserModel, ({ id }: UserModel) => id, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @OneToMany(
    () => TransactionStatusModel,
    (transactionsStatus: TransactionStatusModel) =>
      transactionsStatus.transaction,
    {
      eager: true,
    },
  )
  @JoinColumn()
  transactionStatus: TransactionStatusModel[];
}
