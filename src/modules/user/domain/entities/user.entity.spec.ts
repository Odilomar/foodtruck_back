import { faker } from '@faker-js/faker';
import { IUser } from '../interfaces/user.interface';
import { UserEntity } from './user.entity';

describe('UserEntity', () => {
  const minimal: IUser = {
    id: faker.datatype.number(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    cpf: faker.datatype.number().toString(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  };

  it('should be defined', () => {
    expect(new UserEntity(minimal)).toBeDefined();
  });
  it('should create a user with minimal information', () => {
    const user = new UserEntity(minimal);

    expect(user).toHaveProperty('id', minimal.id);
    expect(user).toHaveProperty('name', minimal.name);
    expect(user).toHaveProperty('email', minimal.email);
    expect(user).toHaveProperty('password', minimal.password);
    expect(user).toHaveProperty('cpf', minimal.cpf);
    expect(user).toHaveProperty('created_at', minimal.created_at);
    expect(user).toHaveProperty('updated_at', minimal.updated_at);
  });
  it('should create a user with deleted_at', () => {
    const deleted_at = faker.date.future();
    const user = new UserEntity({
      ...minimal,
      deleted_at,
    });

    expect(user).toHaveProperty('deleted_at', deleted_at);
  });
});
