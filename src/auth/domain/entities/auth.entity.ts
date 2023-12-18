import { User } from '../../../user/domain/entities/user.entity';

export class ResponseLogin {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export class UserPayloadForToken {
  userId: string;
  email: string;
}

export class RefreshTokenPayload extends UserPayloadForToken {
  refreshToken: string;
}
