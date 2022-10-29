import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ProductController } from './controllers/product.controller';
import { ProductModel } from './infra/model/product.model';
import { ProductRepository } from './infra/repositories/product.repository';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { DeleteProductUseCase } from './use-cases/delete-product.use-case';
import { FindOneProductUseCase } from './use-cases/find-one-product.use-case';
import { FindProductUseCase } from './use-cases/find-product.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel]), UserModule],
  providers: [
    ProductRepository,
    CreateProductUseCase,
    UpdateProductUseCase,
    FindOneProductUseCase,
    FindProductUseCase,
    DeleteProductUseCase,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
