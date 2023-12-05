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
import { handlePrismaError } from 'src/shared/helpers/prisma-error.handler';

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

    return {
      data: users,
      total,
    };
  }

  async findById({ id }: UserParamDto): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async create(data: User): Promise<User> {
    try {
      const userData: Prisma.UserCreateInput = {
        email: data.email,
        name: data.name,
        role: {
          connect: {
            id: data.roleId,
          },
        },
      };
      return await this.prismaService.user.create({ data: userData });
    } catch (error) {
      handlePrismaError({
        error,
        context: { modelName: 'User', uniqueFields: ['email'] },
      });
    }
  }

  async update({ id }: UserParamDto, data: User): Promise<User> {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      handlePrismaError({
        error,
        context: {
          modelName: 'User',
          uniqueFields: ['email'],
          idFieldName: 'id',
          id,
        },
      });
    }
  }

  async delete({ id }: UserParamDto): Promise<void> {
    try {
      await this.prismaService.user.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError({
        error,
        context: { modelName: 'User', idFieldName: 'id', id },
      });
    }
  }
}
