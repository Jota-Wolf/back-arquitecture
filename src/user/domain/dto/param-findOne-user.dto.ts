import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class UserIdParamDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class UserEmailParamDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
