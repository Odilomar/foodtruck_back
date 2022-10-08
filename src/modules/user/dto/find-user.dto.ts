import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
}
