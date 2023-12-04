import { Transform } from 'class-transformer';
import { IsOptional, IsIn, IsInt } from 'class-validator';

export class RoleOrder {
  @IsOptional()
  @IsIn(['asc', 'desc'])
  name?: 'asc' | 'desc';
}

export class FindAllRoleParamDto {
  @IsOptional()
  orderBy?: RoleOrder;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  skip?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  take?: number;
}
