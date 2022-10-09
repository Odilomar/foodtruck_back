import { ProductTypeEnum } from '@/modules/shared/enum/product-type.enum';

export interface IProduct {
  id?: number;
  title: string;
  description: string;
  url: string;
  unit_price: number;
  type: ProductTypeEnum;
  created_by_id: number;
  updated_by_id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
