import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { FindUserDto } from '../dto/find-user.dto';
import { UserRepository } from '../infra/repositories/user.repository';

@Injectable()
export class FindUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ search }: FindUserDto) {
    return this.userRepository.find({
      where: [
        {
          name: Like(search),
        },
        {
          email: Like(search),
        },
        {
          cpf: Like(search),
        },
      ],
    });
  }
}
