import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindTransactionDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
}
