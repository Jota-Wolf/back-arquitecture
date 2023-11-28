import { Transform } from 'class-transformer';
import { IsOptional, IsIn, IsInt } from 'class-validator';

export class UserOrder {
  @IsOptional()
  @IsIn(['asc', 'desc'])
  name?: 'asc' | 'desc';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  email?: 'asc' | 'desc';
}

export class FindAllUserParamDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  orderBy?: UserOrder;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  skip?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  take?: number;
}
