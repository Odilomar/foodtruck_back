import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { DeleteUserUseCase } from '../use-cases/delete-user.use-case';
import { FindOneUserUseCase } from '../use-cases/find-one-user.use-case';
import { FindUserUseCase } from '../use-cases/find-user.use-case';
import { UpdateUserUseCase } from '../use-cases/update-user.use-case';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindOneUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
