import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteProductDto } from '../dto/delete-product.dto';
import { ProductRepository } from '../infra/repositories/product.repository';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute({ id }: DeleteProductDto) {
    const savedProduct = await this.productRepository.findOne({
      where: { id },
    });

    if (!savedProduct) throw new NotFoundException('Product not found!');

    return this.productRepository.delete(id);
  }
}
