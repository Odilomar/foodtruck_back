import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteTransactionDto } from '../dto/delete-transaction.dto';
import { TransactionRepository } from '../infra/repositories/transaction.repository';

@Injectable()
export class DeleteTransactionUseCase {
  constructor(private readonly productRepository: TransactionRepository) {}
  async execute({ id }: DeleteTransactionDto) {
    const savedTransaction = await this.productRepository.findOne({
      where: { id },
    });

    if (!savedTransaction)
      throw new NotFoundException('Transaction not found!');

    return this.productRepository.delete(id);
  }
}
