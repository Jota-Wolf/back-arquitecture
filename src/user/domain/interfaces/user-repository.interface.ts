import { CreateUserDto } from '../dto/create-user.dto';
import { FindAllUserParamDto } from '../dto/param-findAll-user.dto';
import {
  UserEmailParamDto,
  UserIdParamDto,
} from '../dto/param-findOne-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUser, ResponseUser, User } from '../entities/user.entity';

export interface IUserRepository {
  findAll(params: FindAllUserParamDto): Promise<ResponseUser>;
  findById({ id }: UserIdParamDto): Promise<User | null>;
  findByEmail({ email }: UserEmailParamDto): Promise<CreateUser | null>;
  create(data: CreateUserDto, roleId: string): Promise<User>;
  update({ id }: UserIdParamDto, data: UpdateUserDto): Promise<User>;
  delete({ id }: UserIdParamDto): Promise<void>;
}
