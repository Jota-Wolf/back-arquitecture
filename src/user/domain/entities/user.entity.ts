export class User {
  id: string;
  roleId: string;
  email: string;
  name: string;
  isVerified: boolean;
  isSuscribed: boolean;
}

export class CreateUser extends User {
  password: string;
}

export class UserOrder {
  name?: 'asc' | 'desc';
  email?: 'asc' | 'desc';
}

export class UserFindAllParams {
  skip?: number;
  take?: number;
  orderBy?: UserOrder;
}

export class ResponseUser {
  data: User[];
  total: number;
}
