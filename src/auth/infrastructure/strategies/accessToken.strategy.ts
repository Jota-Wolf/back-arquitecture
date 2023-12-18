import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayloadForToken } from '../../../auth/domain/entities/auth.entity';
import { AUTH_SERVICE } from '../../../auth/types/auth.constants';
import { IAuth } from '../../../auth/domain/interfaces/auth.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    public config: ConfigService,

    @Inject(AUTH_SERVICE) private readonly authService: IAuth,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: UserPayloadForToken) {
    return await this.authService.validateUserLogin({
      email: payload.email,
    });
  }
}
