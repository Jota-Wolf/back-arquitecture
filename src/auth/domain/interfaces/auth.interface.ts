import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ResponseLogin } from '../entities/auth.entity';
import { UserEmailParamDto } from '../../../user/domain/dto/param-findOne-user.dto';
import { CreateUser } from '../../../user/domain/entities/user.entity';

export interface IAuth {
  registerClient(data: RegisterDto): Promise<void>;
  login(data: LoginDto): Promise<ResponseLogin>;
  validateUserLogin(data: UserEmailParamDto): Promise<CreateUser>;
}
