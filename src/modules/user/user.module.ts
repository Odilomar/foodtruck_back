import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './infra/model/user.model';
import { UserRepository } from './infra/repositories/user.repository';
import { CreateUserUseCase } from './use-cases/create-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [UserRepository, CreateUserUseCase],
})
export class UserModule {}
