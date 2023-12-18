import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ITokenService } from '../domain/interfaces/token.interface';
import { UserPayloadForToken } from '../domain/entities/auth.entity';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateAccessToken({ userId, email }: UserPayloadForToken): string {
    return this.jwtService.sign(
      { userId, email },
      {
        expiresIn: '30m',
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      },
    );
  }

  generateRefreshToken({ userId, email }: UserPayloadForToken): string {
    const accessToken = this.generateAccessToken({ userId, email });
    return this.jwtService.sign(
      { userId, email, accessToken },
      {
        expiresIn: '2d',
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      },
    );
  }
}
