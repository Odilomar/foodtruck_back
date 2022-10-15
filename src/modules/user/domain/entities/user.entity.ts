import { customDateFactory } from '@/shared/utils/custom-date';
import { EntityValidator } from '@/shared/validators/class-validator-fields';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class UserEntity implements IUser {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  cpf: string;

  @IsDate()
  @IsOptional()
  created_at?: Date;

  @IsDate()
  @IsOptional()
  updated_at?: Date;

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
    this.created_at =
      (created_at && customDateFactory(created_at)) || customDateFactory();
    this.updated_at =
      (updated_at && customDateFactory(updated_at)) || customDateFactory();
    this.deleted_at = deleted_at;

    this.validate();
  }

  validate(): void {
    const validator = new EntityValidator(this);
    validator.validate('user');
  }
}
