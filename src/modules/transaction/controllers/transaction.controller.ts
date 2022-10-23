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
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { FindTransactionDto } from '../dto/find-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { CreateTransactionUseCase } from '../use-cases/create-transaction.use-case';
import { DeleteTransactionUseCase } from '../use-cases/delete-transaction.use-case';
import { FindOneTransactionUseCase } from '../use-cases/find-one-transaction.use-case';
import { FindTransactionUseCase } from '../use-cases/find-transaction.use-case';
import { UpdateTransactionUseCase } from '../use-cases/update-transaction.use-case';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase,
    private readonly findOneTransactionUseCase: FindOneTransactionUseCase,
    private readonly findTransactionUseCase: FindTransactionUseCase,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createTransaction(@Body() input: CreateTransactionDto) {
    return this.createTransactionUseCase.execute(input);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateTransaction(
    @Param('id') id: number,
    @Body() input: UpdateTransactionDto,
  ) {
    await this.updateTransactionUseCase.execute({ id, ...input });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTransaction(@Param('id') id: number) {
    await this.deleteTransactionUseCase.execute({ id });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOneTransaction(@Param('id') id: number) {
    return this.findOneTransactionUseCase.execute({ id });
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findTransaction(@Query() input: FindTransactionDto) {
    return this.findTransactionUseCase.execute(input);
  }
}
