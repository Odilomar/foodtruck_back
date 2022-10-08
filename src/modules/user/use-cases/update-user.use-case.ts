import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../infra/repositories/user.repository';

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

    return this.userRepository.save(user);
  }
}
