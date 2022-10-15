import { ProductTypeEnum } from '@/shared/enum/product-type.enum';
import { customDateFactory } from '@/shared/utils/custom-date';
import { EntityValidator } from '@/shared/validators/class-validator-fields';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IProduct } from '../interfaces/product.interface';

export class ProductEntity implements IProduct {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  url: string;

  @IsNumber()
  unit_price: number;

  @IsEnum(ProductTypeEnum)
  type: ProductTypeEnum;

  @IsNumber()
  created_by_id: number;

  @IsNumber()
  @IsOptional()
  updated_by_id?: number;

  @IsDate()
  @IsOptional()
  created_at?: Date;

  @IsDate()
  @IsOptional()
  updated_at?: Date;

  @IsDate()
  @IsOptional()
  deleted_at?: Date;

  constructor({
    id,
    title,
    description,
    url,
    unit_price,
    type,
    created_by_id,
    updated_by_id,
    created_at,
    updated_at,
    deleted_at,
  }: Partial<IProduct>) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.url = url;
    this.unit_price = unit_price;
    this.type = type;
    this.created_by_id = created_by_id;
    this.updated_by_id = updated_by_id;
    this.created_at =
      (created_at && customDateFactory(created_at)) || customDateFactory();
    this.updated_at =
      (updated_at && customDateFactory(updated_at)) || customDateFactory();
    this.deleted_at = deleted_at;

    this.validate();
  }

  validate(): void {
    const validator = new EntityValidator(this);
    validator.validate('product');
  }
}
