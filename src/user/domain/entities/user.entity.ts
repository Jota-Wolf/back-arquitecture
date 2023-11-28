export class User {
  id?: number;
  email: string;
  name?: string;
}

export class UserOrder {
  name?: 'asc' | 'desc';
  email?: 'asc' | 'desc';
}

export class FindAllParams {
  skip?: number;
  take?: number;
  orderBy?: UserOrder;
}

export class ResponseUser {
  data: User[];
  total: number;
}
