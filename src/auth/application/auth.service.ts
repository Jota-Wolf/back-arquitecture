import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { LoginDto } from '../domain/dto/login.dto';
import { RegisterDto } from '../domain/dto/register.dto';
import { IAuth } from '../domain/interfaces/auth.interface';
import { ITokenService } from '../domain/interfaces/token.interface';
import { UserService } from '../../user/application/user.service';
import {
  hashPassword,
  verifyPassword,
} from '../../shared/helpers/hashPassword.handler';
import { TOKEN_SERVICE } from '../types/auth.constants';
import { omitSensitiveUserData } from '../../user/domain/utils/user.utils';
import { RoleService } from '../../role/application/role.service';
import { CLIENT } from '../../role/types/role.constants';
import { UserEmailParamDto } from '../../user/domain/dto/param-findOne-user.dto';
import { CreateUser } from '../../user/domain/entities/user.entity';
import { USER_REPOSITORY } from '../../user/types/user.constants';
import { IUserRepository } from '../../user/domain/interfaces/user-repository.interface';

@Injectable()
export class AuthService implements IAuth {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,

    @Inject(TOKEN_SERVICE)
    private readonly tokenService: ITokenService,

    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async registerClient(data: RegisterDto) {
    const password = await hashPassword(data.password);
    const roles = await this.roleService.findAll({});
    const roleId = roles.data.find((role) => role.name === CLIENT).id;
    await this.userService.create(
      {
        ...data,
        password,
      },
      roleId,
    );
  }

  async validateUserLogin({
    email,
  }: UserEmailParamDto): Promise<CreateUser | null> {
    const user = await this.userRepository.findByEmail({ email });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new BadRequestException('User not verified');
    }

    return user;
  }

  async login(data: LoginDto) {
    const user = await this.validateUserLogin({
      email: data.email,
    });
    const isVerifiedPassword = await verifyPassword(
      user.password,
      data.password,
    );
    if (!isVerifiedPassword) {
      throw new BadRequestException('Invalid credentials');
    }
    const accessToken = this.tokenService.generateAccessToken({
      userId: user.id,
      email: data.email,
    });
    const refreshToken = this.tokenService.generateRefreshToken({
      userId: user.id,
      email: data.email,
    });
    const userWithoutSensitiveData = omitSensitiveUserData(user);
    return {
      accessToken,
      refreshToken,
      user: userWithoutSensitiveData,
    };
  }
}
