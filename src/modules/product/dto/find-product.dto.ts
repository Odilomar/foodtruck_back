import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindProductDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
}
