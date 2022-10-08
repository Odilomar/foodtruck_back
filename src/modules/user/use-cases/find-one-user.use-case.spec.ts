import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindOneUserDto } from '../dto/find-one-user.dto';
import { UserModel } from '../infra/model/user.model';
import { UserRepository } from '../infra/repositories/user.repository';
import { FindOneUserUseCase } from './find-one-user.use-case';

describe('FindOneUserUseCase', () => {
  let service: FindOneUserUseCase;

  const input = {
    id: faker.datatype.number(),
  } as FindOneUserDto;

  const user = {
    ...input,
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    cpf: faker.datatype.number().toString(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as UserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn().mockReturnValue(user),
          },
        },
      ],
    }).compile();

    service = module.get<FindOneUserUseCase>(FindOneUserUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find one user', async () => {
    const founded = await service.execute(input);

    expect(founded).toHaveProperty('name', user.name);
    expect(founded).toHaveProperty('email', user.email);
    expect(founded).toHaveProperty('password', user.password);
    expect(founded).toHaveProperty('cpf', user.cpf);
  });
});
