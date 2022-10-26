import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Like } from 'typeorm';
import { FindProductDto } from '../dto/find-product.dto';
import { ProductModel } from '../infra/model/product.model';
import { ProductRepository } from '../infra/repositories/product.repository';

@Injectable()
export class FindProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute({ search }: FindProductDto) {
    const where: FindOptionsWhere<ProductModel>[] = [];

    if (search) {
      where.push({
        title: Like(search),
      });
      where.push({
        description: Like(search),
      });
    }

    return this.productRepository.find({
      relations: ['created_by', 'updated_by'],
      ...(where.length > 0 ? { where } : {}),
    });
  }
}
