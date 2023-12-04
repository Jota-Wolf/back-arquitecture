import { Injectable, Inject } from '@nestjs/common';
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
    return this.roleRepository.findAll(params);
  }

  async findById({ id }: RoleParamDto) {
    return this.roleRepository.findById({ id });
  }

  async create(data: CreateRoleDto) {
    return this.roleRepository.create(data);
  }

  async update({ id }: RoleParamDto, data: UpdateRoleDto) {
    return this.roleRepository.update({ id }, data);
  }

  async delete({ id }: RoleParamDto) {
    return this.roleRepository.delete({ id });
  }
}
