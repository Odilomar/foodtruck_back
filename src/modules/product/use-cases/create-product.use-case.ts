import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../domain/entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductRepository } from '../infra/repositories/product.repository';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(input: CreateProductDto) {
    const product = new ProductEntity(input);

    return this.productRepository.save(product);
  }
}
