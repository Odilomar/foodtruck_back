import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindOneProductDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
