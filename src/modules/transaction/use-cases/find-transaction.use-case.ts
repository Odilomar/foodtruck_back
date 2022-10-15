import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Like } from 'typeorm';
import { FindTransactionDto } from '../dto/find-transaction.dto';
import { TransactionModel } from '../infra/model/transaction.model';
import { TransactionRepository } from '../infra/repositories/transaction.repository';

@Injectable()
export class FindTransactionUseCase {
  constructor(private readonly productRepository: TransactionRepository) {}
  async execute({ search }: FindTransactionDto) {
    const where: FindOptionsWhere<TransactionModel>[] = [];

    if (search) {
      where.push({
        customer_cpf: Like(search),
      });
    }

    return this.productRepository.find(where.length > 0 ? { where } : {});
  }
}
