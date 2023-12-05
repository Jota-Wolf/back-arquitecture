import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from '../domain/dto/create-role.dto';
import { RoleParamDto, UpdateRoleDto } from '../domain/dto/update-role.dto';
import { IRoleRepository } from '../domain/interfaces/role-repository.interface';
import { ROLE_REPOSITORY } from '../types/role.constants';
import { FindAllRoleParamDto } from '../domain/dto/param-findAll-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async findAll(params: FindAllRoleParamDto) {
    return await this.roleRepository.findAll(params);
  }

  //Depends on the use case being implemented, an exception can be thrown or not
  async findById({ id }: RoleParamDto) {
    const role = await this.roleRepository.findById({ id });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async create(data: CreateRoleDto) {
    return await this.roleRepository.create(data);
  }

  async update({ id }: RoleParamDto, data: UpdateRoleDto) {
    return await this.roleRepository.update({ id }, data);
  }

  async delete({ id }: RoleParamDto) {
    return await this.roleRepository.delete({ id });
  }
}
