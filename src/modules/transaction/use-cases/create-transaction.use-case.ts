import { TransactionStatusEnum } from '@/shared/enum/transaction-status.enum';
import { Injectable } from '@nestjs/common';
import { TransactionStatusEntity } from '../domain/entities/transaction-status.entity';
import { TransactionEntity } from '../domain/entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionStatusRepository } from '../infra/repositories/transaction-status.repository';
import { TransactionRepository } from '../infra/repositories/transaction.repository';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private readonly productRepository: TransactionRepository,
    private readonly transactionStatusRepository: TransactionStatusRepository,
  ) {}
  async execute(input: CreateTransactionDto) {
    const product = new TransactionEntity(input);

    const transaction = await this.productRepository.save(product);

    const transactionStatus = new TransactionStatusEntity({
      transaction_id: transaction.id,
      status: TransactionStatusEnum.CREATED,
    });

    await this.transactionStatusRepository.save(transactionStatus);

    return transaction;
  }
}
