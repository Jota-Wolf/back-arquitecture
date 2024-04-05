import { IsEnum } from 'class-validator';
import { RoleEnum } from '../../../role/types/role.constants';

export class CreateRoleDto {
  @IsEnum(RoleEnum)
  name: RoleEnum;
}
