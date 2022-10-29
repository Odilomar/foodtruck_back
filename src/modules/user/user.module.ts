import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserModel } from './infra/model/user.model';
import { UserRepository } from './infra/repositories/user.repository';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { FindOneUserUseCase } from './use-cases/find-one-user.use-case';
import { FindUserUseCase } from './use-cases/find-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [
    UserRepository,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    FindUserUseCase,
    FindOneUserUseCase,
  ],
  controllers: [UserController],
  exports: [FindUserUseCase],
})
export class UserModule {}
