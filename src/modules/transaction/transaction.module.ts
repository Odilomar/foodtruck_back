import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionProductModel } from './infra/model/transaction-product.model';
import { TransactionStatusModel } from './infra/model/transaction-status.model';
import { TransactionModel } from './infra/model/transaction.model';
import { TransactionProductRepository } from './infra/repositories/transaction-product.repository';
import { TransactionStatusRepository } from './infra/repositories/transaction-status.repository';
import { TransactionRepository } from './infra/repositories/transaction.repository';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { DeleteTransactionUseCase } from './use-cases/delete-transaction.use-case';
import { FindOneTransactionUseCase } from './use-cases/find-one-transaction.use-case';
import { FindTransactionUseCase } from './use-cases/find-transaction.use-case';
import { UpdateTransactionUseCase } from './use-cases/update-transaction.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionModel,
      TransactionStatusModel,
      TransactionProductModel,
    ]),
  ],
  providers: [
    TransactionRepository,
    TransactionStatusRepository,
    TransactionProductRepository,
    CreateTransactionUseCase,
    UpdateTransactionUseCase,
    FindOneTransactionUseCase,
    FindTransactionUseCase,
    DeleteTransactionUseCase,
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
