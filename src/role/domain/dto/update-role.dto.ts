import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { RoleEnum } from '../../../role/types/role.constants';

export class UpdateRoleDto {
  @IsEnum(RoleEnum)
  @IsOptional()
  name?: string;
}

export class RoleParamDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
