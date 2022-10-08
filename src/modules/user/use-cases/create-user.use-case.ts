import { Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../infra/repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(input: CreateUserDto) {
    const user = new UserEntity(input);
    return this.userRepository.save(user);
  }
}
