import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './infra/model/user.model';
// import { UserRepositoryService } from './infra/repositories/user.repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  // providers: [UserRepositoryService],
})
export class UserModule {}
