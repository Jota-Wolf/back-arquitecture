import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { UpdateUserDto, UserParamDto } from '../domain/dto/update-user.dto';
import { IUserRepository } from '../domain/interfaces/user-repository.interface';
import { USER_REPOSITORY } from '../types/user.constants';
import { FindAllUserParamDto } from '../domain/dto/param-findAll-user.dto';
import { ROLE_REPOSITORY } from '../../role/types/role.constants';
import { IRoleRepository } from '../../role/domain/interfaces/role-repository.interface';
import { RoleParamDto } from '../../role/domain/dto/update-role.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  private async checkRoleExists({ id }: RoleParamDto) {
    if (id) {
      const role = await this.roleRepository.findById({ id });
      if (!role) {
        throw new NotFoundException('Role not found');
      }
    }
  }

  async findAll(params: FindAllUserParamDto) {
    return await this.userRepository.findAll(params);
  }

  async findById({ id }: UserParamDto) {
    return await this.userRepository.findById({ id });
  }

  async create(data: CreateUserDto) {
    await this.checkRoleExists({ id: data?.roleId });
    return await this.userRepository.create(data);
  }

  async update({ id }: UserParamDto, data: UpdateUserDto) {
    await this.checkRoleExists({ id: data?.roleId });
    return await this.userRepository.update({ id }, data);
  }

  async delete({ id }: UserParamDto) {
    return await this.userRepository.delete({ id });
  }
}
