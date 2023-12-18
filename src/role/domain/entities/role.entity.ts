export class Role {
  id: string;
  name: string;
}

export class RoleOrder {
  name?: 'asc' | 'desc';
}

export class RoleFindAllParams {
  skip?: number;
  take?: number;
  orderBy?: RoleOrder;
}

export class ResponseRole {
  data: Role[];
  total: number;
}
