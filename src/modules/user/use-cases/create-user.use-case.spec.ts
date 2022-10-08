import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserModel } from '../infra/model/user.model';
import { UserRepository } from '../infra/repositories/user.repository';
import { CreateUserUseCase } from './create-user.use-case';

describe('CreateUserUseCase', () => {
  let service: CreateUserUseCase;

  const input = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    cpf: faker.datatype.number().toString(),
  } as CreateUserDto;

  const user = {
    ...input,
    id: faker.datatype.number(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as UserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            save: jest.fn().mockReturnValue(user),
          },
        },
      ],
    }).compile();

    service = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const createdUser = await service.execute(input);

    expect(createdUser).toHaveProperty('name', input.name);
    expect(createdUser).toHaveProperty('email', input.email);
    expect(createdUser).toHaveProperty('password', input.password);
    expect(createdUser).toHaveProperty('cpf', input.cpf);
  });

  it('should throw error on create user without name', async () => {
    await expect(
      service.execute({
        ...input,
        name: null,
      }),
    ).rejects.toThrowError();
  });

  it('should throw error on create user without email', async () => {
    await expect(
      service.execute({
        ...input,
        email: null,
      }),
    ).rejects.toThrowError();
  });

  it('should throw error on create user without password', async () => {
    await expect(
      service.execute({
        ...input,
        password: null,
      }),
    ).rejects.toThrowError();
  });

  it('should throw error on create user without cpf', async () => {
    await expect(
      service.execute({
        ...input,
        cpf: null,
      }),
    ).rejects.toThrowError();
  });
});
