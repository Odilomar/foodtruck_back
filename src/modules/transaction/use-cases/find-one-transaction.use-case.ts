import { Injectable } from '@nestjs/common';
import { FindOneTransactionDto } from '../dto/find-one-transaction.dto';
import { TransactionRepository } from '../infra/repositories/transaction.repository';

@Injectable()
export class FindOneTransactionUseCase {
  constructor(private readonly productRepository: TransactionRepository) {}
  async execute({ id }: FindOneTransactionDto) {
    return this.productRepository.findOne({ where: { id } });
  }
}
