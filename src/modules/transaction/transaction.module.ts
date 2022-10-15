import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionModel } from './infra/model/transaction.model';
import { TransactionRepository } from './infra/repositories/transaction.repository';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { DeleteTransactionUseCase } from './use-cases/delete-transaction.use-case';
import { FindOneTransactionUseCase } from './use-cases/find-one-transaction.use-case';
import { FindTransactionUseCase } from './use-cases/find-transaction.use-case';
import { UpdateTransactionUseCase } from './use-cases/update-transaction.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionModel])],
  providers: [
    TransactionRepository,
    CreateTransactionUseCase,
    UpdateTransactionUseCase,
    FindOneTransactionUseCase,
    FindTransactionUseCase,
    DeleteTransactionUseCase,
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
