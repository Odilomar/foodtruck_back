import { ProductTypeEnum } from '@/modules/shared/enum/product-type.enum';
import { faker } from '@faker-js/faker';
import { IProduct } from '../interfaces/product.interface';
import { ProductEntity } from './product.entity';

describe('ProductEntity', () => {
  const minimal: IProduct = {
    id: faker.datatype.number(),
    title: faker.datatype.string(),
    description: faker.datatype.string(),
    url: faker.datatype.string(),
    unit_price: faker.datatype.number(),
    type: ProductTypeEnum.DRINK,
    created_by_id: faker.datatype.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  };

  it('should be defined', () => {
    expect(new ProductEntity(minimal)).toBeDefined();
  });
  it('should create a product with minimal information', () => {
    const product = new ProductEntity(minimal);

    expect(product).toHaveProperty('id', minimal.id);
    expect(product).toHaveProperty('title', minimal.title);
    expect(product).toHaveProperty('description', minimal.description);
    expect(product).toHaveProperty('url', minimal.url);
    expect(product).toHaveProperty('unit_price', minimal.unit_price);
    expect(product).toHaveProperty('type', minimal.type);
    expect(product).toHaveProperty('created_by_id', minimal.created_by_id);
    expect(product).toHaveProperty('updated_by_id', minimal.updated_by_id);
    expect(product).toHaveProperty('created_at', minimal.created_at);
    expect(product).toHaveProperty('updated_at', minimal.updated_at);
  });
  it('should create a product with deleted_at', () => {
    const deleted_at = faker.date.future();
    const product = new ProductEntity({
      ...minimal,
      deleted_at,
    });

    expect(product).toHaveProperty('deleted_at', deleted_at);
  });
});
