import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}

export class RoleParamDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
