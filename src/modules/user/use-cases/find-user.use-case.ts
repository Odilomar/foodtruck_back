import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Like } from 'typeorm';
import { FindUserDto } from '../dto/find-user.dto';
import { UserModel } from '../infra/model/user.model';
import { UserRepository } from '../infra/repositories/user.repository';

@Injectable()
export class FindUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ search }: FindUserDto) {
    const where: FindOptionsWhere<UserModel>[] = [];

    if (search) {
      where.push({
        name: Like(search),
      });
      where.push({
        email: Like(search),
      });
      where.push({
        cpf: Like(search),
      });
    }

    return this.userRepository.find(where.length > 0 ? { where } : {});
  }
}
