import { Injectable } from '@nestjs/common';
import { TransactionEntity } from '../domain/entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionRepository } from '../infra/repositories/transaction.repository';

@Injectable()
export class CreateTransactionUseCase {
  constructor(private readonly productRepository: TransactionRepository) {}
  async execute(input: CreateTransactionDto) {
    const product = new TransactionEntity(input);

    return this.productRepository.save(product);
  }
}
