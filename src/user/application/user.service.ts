import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { UpdateUserDto } from '../domain/dto/update-user.dto';
import { IUserRepository } from '../domain/interfaces/user-repository.interface';
import { User } from '../domain/entities/user.entity';
import { FindAllUserParamDto } from '../domain/dto/param-findAll-user.dto';
import { IRoleRepository } from '../../role/domain/interfaces/role-repository.interface';
import { RoleParamDto } from '../../role/domain/dto/update-role.dto';
import { USER_REPOSITORY } from '../types/user.constants';
import { ROLE_REPOSITORY } from '../../role/types/role.constants';
import { omitSensitiveUserData } from '../domain/utils/user.utils';
import { UserIdParamDto } from '../domain/dto/param-findOne-user.dto';

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

  async findById({ id }: UserIdParamDto) {
    return await this.userRepository.findById({ id });
  }

  async create(data: CreateUserDto, roleId: string): Promise<User> {
    await this.checkRoleExists({ id: roleId });
    const userWithSensitiveData = await this.userRepository.create(
      data,
      roleId,
    );
    const userWithoutSensitiveData = omitSensitiveUserData(
      userWithSensitiveData,
    );
    return userWithoutSensitiveData;
  }

  async update({ id }: UserIdParamDto, data: UpdateUserDto): Promise<User> {
    await this.checkRoleExists({ id: data?.roleId });
    const user = await this.userRepository.findById({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const userWithSensitiveData = await this.userRepository.update(
      { id },
      data,
    );
    const userWithoutSensitiveData = omitSensitiveUserData(
      userWithSensitiveData,
    );
    return userWithoutSensitiveData;
  }

  async delete({ id }: UserIdParamDto) {
    return await this.userRepository.delete({ id });
  }
}
