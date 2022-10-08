import { Injectable } from '@nestjs/common';
import { FindOneUserDto } from '../dto/find-one-user.dto';
import { UserRepository } from '../infra/repositories/user.repository';

@Injectable()
export class FindOneUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ id }: FindOneUserDto) {
    return this.userRepository.findOne({ where: { id } });
  }
}
