import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../infra/repositories/user.repository';

import * as bcrypt from 'bcrypt';
import configuration from '@/config/configuration';
import { cpf } from 'cpf-cnpj-validator';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(input: CreateUserDto) {
    const user = new UserEntity(input);

    if (!cpf.isValid(user.cpf)) {
      throw new BadRequestException('CPF is not valid!');
    }

    user.password = await bcrypt.hash(
      user.password,
      configuration().auth.saltRounds,
    );

    return this.userRepository.save(user);
  }
}
