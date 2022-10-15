import { PaymentTypeEnum } from '@/shared/enum/payment-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ITransaction } from '../domain/interfaces/transaction.interface';

export class CreateTransactionDto implements ITransaction {
  @ApiProperty()
  @IsNumber()
  user_id: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  customer_cpf?: string;

  @ApiProperty()
  @IsNumber()
  net_total: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  discounts?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  gross_total?: number;

  @ApiProperty()
  @IsEnum(PaymentTypeEnum)
  payment_type: PaymentTypeEnum;
}
