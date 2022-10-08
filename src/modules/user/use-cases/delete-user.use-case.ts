import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { UserRepository } from '../infra/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ id }: DeleteUserDto) {
    const savedUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!savedUser) throw new NotFoundException('User not found!');

    return this.userRepository.delete(id);
  }
}
