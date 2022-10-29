import { FindUserUseCase } from '@/modules/user/use-cases/find-user.use-case';
import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../domain/entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductRepository } from '../infra/repositories/product.repository';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly findUserUseCase: FindUserUseCase,
  ) {}
  async execute(input: CreateProductDto) {
    const users = await this.findUserUseCase.execute({});
    const user = users[0];
    const product = new ProductEntity({
      ...input,
      created_by_id: user.id,
      updated_by_id: user.id,
    });

    return this.productRepository.save(product);
  }
}
