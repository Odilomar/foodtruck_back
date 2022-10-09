import { ProductTypeEnum } from '@/modules/shared/enum/product-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsNumber()
  unit_price: number;

  @ApiProperty()
  @IsEnum(ProductTypeEnum)
  type: ProductTypeEnum;

  @ApiProperty()
  @IsNumber()
  created_by_id: number;

  @ApiProperty()
  @IsNumber()
  updated_by_id?: number;
}
