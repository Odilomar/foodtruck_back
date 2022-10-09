import { Injectable } from '@nestjs/common';
import { FindOneProductDto } from '../dto/find-one-product.dto';
import { ProductRepository } from '../infra/repositories/product.repository';

@Injectable()
export class FindOneProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute({ id }: FindOneProductDto) {
    return this.productRepository.findOne({ where: { id } });
  }
}
