export class User {
  roleId: string;
  email: string;
  name: string;
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
