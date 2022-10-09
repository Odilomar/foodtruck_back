import { ProductTypeEnum } from '@/modules/shared/enum/product-type.enum';
import { UserModel } from '@/modules/user/infra/model/user.model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IProduct } from '../../domain/interfaces/product.interface';

@Entity('products')
export class ProductModel implements IProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column({ type: 'integer' })
  unit_price: number;

  @Column({ enum: ProductTypeEnum })
  type: ProductTypeEnum;

  @Column({ type: 'integer' })
  created_by_id: number;

  @Column({ type: 'integer' })
  updated_by_id?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => UserModel, ({ id }: UserModel) => id, {
    nullable: true,
  })
  @JoinColumn({ name: 'created_by_id' })
  created_by?: UserModel;

  @ManyToOne(() => UserModel, ({ id }: UserModel) => id, {
    nullable: true,
  })
  @JoinColumn({ name: 'updated_by_id' })
  updated_by?: UserModel;
}
