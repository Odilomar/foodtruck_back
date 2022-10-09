import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductModel } from '../model/product.model';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}

  async find(props?: FindManyOptions<ProductModel>) {
    return this.productRepository.find(props);
  }

  async findOne(props: FindOneOptions) {
    return this.productRepository.findOne(props);
  }

  create(product: ProductEntity) {
    return this.productRepository.create(product);
  }

  async save(product: ProductEntity | ProductModel) {
    if (product instanceof ProductEntity) {
      product = this.create(product);
    }

    return this.productRepository.save(product);
  }

  async insert(product: ProductModel) {
    return this.productRepository.insert(product);
  }

  async update(
    criteria: FindOptionsWhere<ProductModel>,
    product: ProductModel,
  ) {
    return this.productRepository.update(criteria, product);
  }

  async delete(id: number) {
    return this.productRepository.softDelete(id);
  }
}
