import { PaymentTypeEnum } from '@/shared/enum/payment-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTransactionDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  user_id?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  customer_cpf?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  net_total?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  discounts?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  gross_total?: number;

  @ApiPropertyOptional()
  @IsEnum(PaymentTypeEnum)
  @IsOptional()
  payment_type?: PaymentTypeEnum;
}
