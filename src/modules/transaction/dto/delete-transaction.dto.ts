import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteTransactionDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
