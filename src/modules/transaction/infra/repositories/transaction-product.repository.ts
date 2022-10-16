import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { TransactionProductEntity } from '../../domain/entities/transaction-product.entity';
import { TransactionProductModel } from '../model/transaction-product.model';

@Injectable()
export class TransactionProductRepository {
  constructor(
    @InjectRepository(TransactionProductModel)
    private readonly transactionProductRepository: Repository<TransactionProductModel>,
  ) {}

  async find(props?: FindManyOptions<TransactionProductModel>) {
    return this.transactionProductRepository.find(props);
  }

  async findOne(props: FindOneOptions) {
    return this.transactionProductRepository.findOne(props);
  }

  create(TransactionProduct: TransactionProductEntity) {
    return this.transactionProductRepository.create(TransactionProduct);
  }

  async save(
    transactionProduct: TransactionProductEntity | TransactionProductModel,
  ) {
    if (transactionProduct instanceof TransactionProductEntity) {
      transactionProduct = this.create(transactionProduct);
    }

    return this.transactionProductRepository.save(transactionProduct);
  }

  async insert(TransactionProduct: TransactionProductModel) {
    return this.transactionProductRepository.insert(TransactionProduct);
  }

  async update(
    criteria: FindOptionsWhere<TransactionProductModel>,
    transactionProduct: TransactionProductModel,
  ) {
    return this.transactionProductRepository.update(
      criteria,
      transactionProduct,
    );
  }

  async delete(id: number) {
    return this.transactionProductRepository.softDelete(id);
  }
}
