import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/services/prisma.service';
import {
  User,
  ResponseUser,
  FindAllParams,
} from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(params: FindAllParams): Promise<ResponseUser> {
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

  async findById(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async create(data: User): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async update(id: number, data: User): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
