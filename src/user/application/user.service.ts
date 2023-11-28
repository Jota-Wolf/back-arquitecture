import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { UpdateUserDto } from '../domain/dto/update-user.dto';
import { IUserRepository } from '../domain/interfaces/user-repository.interface';
import { USER_REPOSITORY } from '../types/user.constants';
import { FindAllUserParamDto } from '../domain/dto/param-findAll-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async findAll(params: FindAllUserParamDto) {
    return this.userRepository.findAll(params);
  }

  async findById(id: number) {
    return this.userRepository.findById(id);
  }

  async create(data: CreateUserDto) {
    return this.userRepository.create(data);
  }

  async update(id: number, data: UpdateUserDto) {
    return this.userRepository.update(id, data);
  }

  async delete(id: number) {
    return this.userRepository.delete(id);
  }
}
