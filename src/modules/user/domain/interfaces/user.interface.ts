export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
