import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../domain/entities/product.entity';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../infra/repositories/product.repository';

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute({ id, ...input }: UpdateProductDto) {
    const savedProduct = await this.productRepository.findOne({
      where: { id },
    });

    if (!savedProduct) throw new NotFoundException('Product not found!');

    const product = new ProductEntity({
      ...savedProduct,
      ...input,
    });

    return this.productRepository.save(product);
  }
}
