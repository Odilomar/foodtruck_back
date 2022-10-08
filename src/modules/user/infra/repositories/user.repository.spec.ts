import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InsertResult, UpdateResult } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserModel } from '../model/user.model';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let service: UserRepository;

  const user = {
    id: faker.datatype.number(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    cpf: faker.datatype.number().toString(),
    created_at: faker.date.past(),
    updated_at: faker.date.future(),
  } as UserModel;

  const insertResult = {
    generatedMaps: [],
    identifiers: [],
    raw: 1,
  } as InsertResult;

  const updateResult = {
    generatedMaps: [],
    identifiers: [],
    raw: 1,
  } as UpdateResult;

  let newUser: UserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserModel),
          useValue: {
            find: jest.fn().mockReturnValue([user]),
            findOne: jest.fn().mockReturnValue(user),
            create: jest.fn().mockReturnValue(new UserModel()),
            save: jest.fn().mockReturnValue(user),
            insert: jest.fn().mockReturnValue(insertResult),
            update: jest.fn().mockReturnValue(updateResult),
            softDelete: jest.fn().mockReturnValue(updateResult),
          },
        },
      ],
    }).compile();

    service = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a UserModel instance', async () => {
    newUser = await service.create(user as UserEntity);

    expect(newUser).toBeInstanceOf(UserModel);
  });

  it('should save a user', async () => {
    newUser = await service.save(user);

    expect(newUser).toHaveProperty('id', user.id);
  });

  it('should insert a user', async () => {
    const insertedResult = await service.insert(user);

    expect(insertedResult).toHaveProperty('raw', insertResult.raw);
  });

  it('should update a user', async () => {
    const updatedResult = await service.update({ id: user.id }, user);

    expect(updatedResult).toHaveProperty('raw', updateResult.raw);
  });

  it('should softDelete a user', async () => {
    const deletedResult = await service.delete(user.id);

    expect(deletedResult).toHaveProperty('raw', deletedResult.raw);
  });

  it('should find users', async () => {
    const users = await service.find();

    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('id', user.id);
  });

  it('should find one user', async () => {
    const found = await service.findOne({ where: { id: user.id } });

    expect(found).toBeDefined();
    expect(found).toHaveProperty('id', user.id);
  });
});
