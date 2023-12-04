import { CreateUserDto } from '../dto/create-user.dto';
import { FindAllUserParamDto } from '../dto/param-findAll-user.dto';
import { UpdateUserDto, UserParamDto } from '../dto/update-user.dto';
import { ResponseUser, User } from '../entities/user.entity';

export interface IUserRepository {
  findAll(params: FindAllUserParamDto): Promise<ResponseUser>;
  findById({ id }: UserParamDto): Promise<User | null>;
  create(data: CreateUserDto): Promise<User>;
  update({ id }: UserParamDto, data: UpdateUserDto): Promise<User>;
  delete({ id }: UserParamDto): Promise<void>;
}
