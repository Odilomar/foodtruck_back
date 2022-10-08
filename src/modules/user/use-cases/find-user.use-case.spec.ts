import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { FindUserDto } from '../dto/find-user.dto';
import { UserModel } from '../infra/model/user.model';
import { UserRepository } from '../infra/repositories/user.repository';
import { FindUserUseCase } from './find-user.use-case';

describe('FindUserUseCase', () => {
  let service: FindUserUseCase;

  const input = {
    search: faker.datatype.string(),
  } as FindUserDto;

  const user = {
    ...input,
    id: faker.datatype.number(),
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
        FindUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            find: jest.fn().mockReturnValue([user]),
          },
        },
      ],
    }).compile();

    service = module.get<FindUserUseCase>(FindUserUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find users', async () => {
    const founded = await service.execute(input);

    expect(founded.length).toBeGreaterThan(0);
    expect(founded[0]).toHaveProperty('id', user.id);
  });
});
