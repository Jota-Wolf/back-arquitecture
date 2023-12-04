import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/services/prisma.service';
import {
  User,
  ResponseUser,
  UserFindAllParams,
} from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { Prisma } from '@prisma/client';
import { UserParamDto } from 'src/user/domain/dto/update-user.dto';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(params: UserFindAllParams): Promise<ResponseUser> {
    const { skip, take, orderBy } = params;
    const where: Prisma.UserWhereInput = {};

    const [users, total] = await Promise.all([
      this.prismaService.user.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.prismaService.user.count({ where }),
    ]);

    console.log('users', users);
    console.log('total', total);

    return {
      data: users,
      total,
    };
  }

  async findById({ id }: UserParamDto): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async create(data: User): Promise<User> {
    const userData: Prisma.UserCreateInput = {
      email: data.email,
      name: data.name,
      role: {
        connect: {
          id: data.roleId,
        },
      },
    };
    return this.prismaService.user.create({ data: userData });
  }

  async update({ id }: UserParamDto, data: User): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async delete({ id }: UserParamDto): Promise<void> {
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
