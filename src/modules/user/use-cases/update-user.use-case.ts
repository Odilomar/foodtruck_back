import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../infra/repositories/user.repository';

import * as bcrypt from 'bcrypt';
import configuration from '@/config/configuration';
import { cpf } from 'cpf-cnpj-validator';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ id, ...input }: UpdateUserDto) {
    const savedUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!savedUser) throw new NotFoundException('User not found!');

    const user = new UserEntity({
      ...savedUser,
      ...input,
    });

    if (input.password) {
      user.password = await bcrypt.hash(
        input.password,
        configuration().auth.saltRounds,
      );
    }

    if (input.cpf && !cpf.isValid(input.cpf)) {
      throw new BadRequestException('User cpf is not valid!');
    }

    return this.userRepository.save(user);
  }
}
