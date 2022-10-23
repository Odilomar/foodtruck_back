import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { DeleteUserUseCase } from '../use-cases/delete-user.use-case';
import { FindOneUserUseCase } from '../use-cases/find-one-user.use-case';
import { FindUserUseCase } from '../use-cases/find-user.use-case';
import { UpdateUserUseCase } from '../use-cases/update-user.use-case';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findUserUseCase: FindUserUseCase,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() input: CreateUserDto) {
    return this.createUserUseCase.execute(input);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(@Param('id') id: number, @Body() input: UpdateUserDto) {
    await this.updateUserUseCase.execute({id, ...input});
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: number) {
    await this.deleteUserUseCase.execute({ id });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOneUser(@Param('id') id: number) {
    return this.findOneUserUseCase.execute({ id });
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findUser(@Query() input: FindUserDto) {
    return this.findUserUseCase.execute(input);
  }
}
