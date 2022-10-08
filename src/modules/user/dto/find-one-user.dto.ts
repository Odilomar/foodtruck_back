import { IsNumber } from 'class-validator';

export class FindOneUserDto {
  @IsNumber()
  id: number;
}
