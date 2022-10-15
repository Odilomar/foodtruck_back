import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { TransactionStatusEntity } from '../../domain/entities/transaction-status.entity';
import { TransactionStatusModel } from '../model/transaction-status.model';

@Injectable()
export class TransactionStatusRepository {
  constructor(
    @InjectRepository(TransactionStatusModel)
    private readonly TransactionStatusRepository: Repository<TransactionStatusModel>,
  ) {}

  async find(props?: FindManyOptions<TransactionStatusModel>) {
    return this.TransactionStatusRepository.find(props);
  }

  async findOne(props: FindOneOptions) {
    return this.TransactionStatusRepository.findOne(props);
  }

  create(TransactionStatus: TransactionStatusEntity) {
    return this.TransactionStatusRepository.create(TransactionStatus);
  }

  async save(
    transactionStatus: TransactionStatusEntity | TransactionStatusModel,
  ) {
    if (transactionStatus instanceof TransactionStatusEntity) {
      transactionStatus = this.create(transactionStatus);
    }

    return this.TransactionStatusRepository.save(transactionStatus);
  }

  async insert(TransactionStatus: TransactionStatusModel) {
    return this.TransactionStatusRepository.insert(TransactionStatus);
  }

  async update(
    criteria: FindOptionsWhere<TransactionStatusModel>,
    transactionStatus: TransactionStatusModel,
  ) {
    return this.TransactionStatusRepository.update(criteria, transactionStatus);
  }

  async delete(id: number) {
    return this.TransactionStatusRepository.softDelete(id);
  }
}
