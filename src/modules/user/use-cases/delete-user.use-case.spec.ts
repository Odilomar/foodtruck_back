import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { UserModel } from '../infra/model/user.model';
import { UserRepository } from '../infra/repositories/user.repository';
import { DeleteUserUseCase } from './delete-user.use-case';

describe('DeleteUserUseCase', () => {
  let service: DeleteUserUseCase;
  let provider: UserRepository;

  const input = {
    id: faker.datatype.number(),
  } as DeleteUserDto;

  const user = {
    ...input,
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    cpf: faker.datatype.number().toString(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as UserModel;

  const deleteResult = {
    raw: 1,
  } as DeleteResult;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn().mockReturnValue(user),
            delete: jest.fn().mockReturnValue(deleteResult),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteUserUseCase>(DeleteUserUseCase);
    provider = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete a user', async () => {
    const deletedUser = await service.execute(input);

    expect(deletedUser).toHaveProperty('raw', deleteResult.raw);
  });

  it('should throw error when user is not found', async () => {
    jest.spyOn(provider, 'findOne').mockReturnValue(null);

    await expect(service.execute(input)).rejects.toThrow(
      new NotFoundException('User not found!'),
    );
  });
});
