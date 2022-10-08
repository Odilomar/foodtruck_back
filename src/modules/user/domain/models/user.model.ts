import { EntityValidator } from '@/modules/shared/validators/class-validator-fields';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class UserModel implements IUser {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  cpf: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsDate()
  @IsOptional()
  deleted_at?: Date;

  constructor({
    id,
    name,
    email,
    password,
    cpf,
    created_at,
    updated_at,
    deleted_at,
  }: Partial<IUser>) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.cpf = cpf;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;

    this.validate();
  }

  validate(): void {
    const validator = new EntityValidator(this);
    validator.validate('user');
  }
}
