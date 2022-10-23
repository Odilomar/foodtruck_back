import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/create-product.dto';
import { FindProductDto } from '../dto/find-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductUseCase } from '../use-cases/create-product.use-case';
import { DeleteProductUseCase } from '../use-cases/delete-product.use-case';
import { FindOneProductUseCase } from '../use-cases/find-one-product.use-case';
import { FindProductUseCase } from '../use-cases/find-product.use-case';
import { UpdateProductUseCase } from '../use-cases/update-product.use-case';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly findOneProductUseCase: FindOneProductUseCase,
    private readonly findProductUseCase: FindProductUseCase,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() input: CreateProductDto) {
    return this.createProductUseCase.execute(input);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateProduct(
    @Param('id') id: number,
    @Body() input: UpdateProductDto,
  ) {
    await this.updateProductUseCase.execute({ id, ...input });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('id') id: number) {
    await this.deleteProductUseCase.execute({ id });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOneProduct(@Param('id') id: number) {
    return this.findOneProductUseCase.execute({ id });
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findProduct(@Query() input: FindProductDto) {
    return this.findProductUseCase.execute(input);
  }
}
