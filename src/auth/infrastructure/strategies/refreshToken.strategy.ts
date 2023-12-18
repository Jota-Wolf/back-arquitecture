import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {
  UserPayloadForToken,
  RefreshTokenPayload,
} from '../../../auth/domain/entities/auth.entity';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(public config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: UserPayloadForToken): RefreshTokenPayload {
    const refreshToken = req
      ?.get('Authorization')
      ?.replace('Bearer', '')
      .trim();
    return { ...payload, refreshToken };
  }
}
