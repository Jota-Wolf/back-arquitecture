import { Prisma } from '@prisma/client';
import { CreateUser } from '../../../user/domain/entities/user.entity';

export const selectUserFieldsPrisma: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  role: {
    select: {
      id: true,
      name: true,
    },
  },
};

export function buildUserPrismaData(data: CreateUser): Prisma.UserCreateInput {
  return {
    email: data.email,
    name: data.name,
    password: data.password,
    role: {
      connect: {
        id: data.roleId,
      },
    },
  };
}
