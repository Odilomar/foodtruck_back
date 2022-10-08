import { IsOptional, IsString } from 'class-validator';

export class FindUserDto {
  @IsString()
  @IsOptional()
  search?: string;
}
