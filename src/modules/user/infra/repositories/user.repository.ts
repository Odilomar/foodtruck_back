import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async find(props?: FindManyOptions<UserModel>) {
    return this.userRepository.find(props);
  }

  async findOne(props: FindOneOptions) {
    return this.userRepository.findOne(props);
  }

  async create(user: UserEntity) {
    return this.userRepository.create(user);
  }

  async save(user: UserModel) {
    return this.userRepository.save(user);
  }

  async insert(user: UserModel) {
    return this.userRepository.insert(user);
  }

  async update(criteria: FindOptionsWhere<UserModel>, user: UserModel) {
    return this.userRepository.update(criteria, user);
  }

  async delete(id: number) {
    return this.userRepository.softDelete(id);
  }
}
