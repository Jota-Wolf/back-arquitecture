import { CreateUserDto } from '../dto/create-user.dto';
import { FindAllUserParamDto } from '../dto/param-findAll-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ResponseUser, User } from '../entities/user.entity';

export interface IUserRepository {
  findAll(params: FindAllUserParamDto): Promise<ResponseUser>;
  findById(id: number): Promise<User | null>;
  create(data: CreateUserDto): Promise<User>;
  update(id: number, data: UpdateUserDto): Promise<User>;
  delete(id: number): Promise<void>;
}
