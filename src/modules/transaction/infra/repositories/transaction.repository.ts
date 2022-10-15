import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { TransactionModel } from '../model/transaction.model';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(TransactionModel)
    private readonly TransactionRepository: Repository<TransactionModel>,
  ) {}

  async find(props?: FindManyOptions<TransactionModel>) {
    return this.TransactionRepository.find(props);
  }

  async findOne(props: FindOneOptions) {
    return this.TransactionRepository.findOne(props);
  }

  create(Transaction: TransactionEntity) {
    return this.TransactionRepository.create(Transaction);
  }

  async save(Transaction: TransactionEntity | TransactionModel) {
    if (Transaction instanceof TransactionEntity) {
      Transaction = this.create(Transaction);
    }

    return this.TransactionRepository.save(Transaction);
  }

  async insert(Transaction: TransactionModel) {
    return this.TransactionRepository.insert(Transaction);
  }

  async update(
    criteria: FindOptionsWhere<TransactionModel>,
    Transaction: TransactionModel,
  ) {
    return this.TransactionRepository.update(criteria, Transaction);
  }

  async delete(id: number) {
    return this.TransactionRepository.softDelete(id);
  }
}
