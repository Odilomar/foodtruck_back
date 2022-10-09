import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './infra/model/product.model';
import { ProductRepository } from './infra/repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel])],
  providers: [ProductRepository],
})
export class ProductModule {}
