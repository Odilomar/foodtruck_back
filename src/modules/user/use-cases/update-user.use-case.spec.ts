import { faker } from '@faker-js/faker';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { cpf } from 'cpf-cnpj-validator';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserModel } from '../infra/model/user.model';
import { UserRepository } from '../infra/repositories/user.repository';
import { UpdateUserUseCase } from './update-user.use-case';

describe('UpdateUserUseCase', () => {
  let service: UpdateUserUseCase;
  let provider: UserRepository;

  const input = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    cpf: cpf.generate(),
    id: faker.datatype.number(),
  } as UpdateUserDto;

  const user = {
    ...input,
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as UserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            save: jest.fn().mockReturnValue(user),
            findOne: jest.fn().mockReturnValue(user),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    provider = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a user', async () => {
    const updatedUser = await service.execute(input);

    expect(updatedUser).toHaveProperty('name', input.name);
    expect(updatedUser).toHaveProperty('email', input.email);
    expect(updatedUser).toHaveProperty('password', input.password);
    expect(updatedUser).toHaveProperty('cpf', input.cpf);
  });

  it('should throw error when user is not found', async () => {
    jest.spyOn(provider, 'findOne').mockReturnValue(null);

    await expect(service.execute(input)).rejects.toThrow(
      new NotFoundException('User not found!'),
    );
  });

  it('should throw error when user cpf is not valid', async () => {
    await expect(
      service.execute({
        ...input,
        cpf: '1212',
      }),
    ).rejects.toThrow(new BadRequestException('User cpf is not valid!'));
  });
});
