import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindOneTransactionDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
