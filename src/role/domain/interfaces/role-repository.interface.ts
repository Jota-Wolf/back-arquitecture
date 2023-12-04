import { CreateRoleDto } from '../dto/create-role.dto';
import { RoleParamDto, UpdateRoleDto } from '../dto/update-role.dto';
import { FindAllRoleParamDto } from '../dto/param-findAll-role.dto';
import { ResponseRole, Role } from '../entities/role.entity';

export interface IRoleRepository {
  findAll(params: FindAllRoleParamDto): Promise<ResponseRole>;
  findById({ id }: RoleParamDto): Promise<Role | null>;
  create(data: CreateRoleDto): Promise<Role>;
  update({ id }: RoleParamDto, data: UpdateRoleDto): Promise<Role>;
  delete({ id }: RoleParamDto): Promise<void>;
}
