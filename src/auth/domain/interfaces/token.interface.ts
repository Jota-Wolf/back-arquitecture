import { UserPayloadForToken } from '../entities/auth.entity';

export interface ITokenService {
  generateAccessToken(user: UserPayloadForToken): string;
  generateRefreshToken(user: UserPayloadForToken): string;
}
