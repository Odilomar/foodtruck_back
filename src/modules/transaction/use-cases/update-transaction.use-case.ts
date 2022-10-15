import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionEntity } from '../domain/entities/transaction.entity';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionRepository } from '../infra/repositories/transaction.repository';

@Injectable()
export class UpdateTransactionUseCase {
  constructor(private readonly productRepository: TransactionRepository) {}
  async execute({ id, ...input }: UpdateTransactionDto) {
    const savedTransaction = await this.productRepository.findOne({
      where: { id },
    });

    if (!savedTransaction)
      throw new NotFoundException('Transaction not found!');

    const product = new TransactionEntity({
      ...savedTransaction,
      ...input,
    });

    return this.productRepository.save(product);
  }
}
