import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../shared/services/prisma.service';
import {
  User,
  ResponseUser,
  UserFindAllParams,
  CreateUser,
} from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import {
  UserEmailParamDto,
  UserIdParamDto,
} from '../../../user/domain/dto/param-findOne-user.dto';
import { handlePrismaError } from '../../../shared/helpers/prisma-error.handler';
import {
  buildUserPrismaData,
  selectUserFieldsPrisma,
} from './user-prisma.utils';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(params: UserFindAllParams): Promise<ResponseUser> {
    const { skip, take, orderBy } = params;
    const where: Prisma.UserWhereInput = {};

    const [users, total] = await Promise.all([
      this.prismaService.user.findMany({
        select: selectUserFieldsPrisma,
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

  async findById({ id }: UserIdParamDto): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findByEmail({ email }: UserEmailParamDto): Promise<CreateUser | null> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUser, roleId: string): Promise<User> {
    try {
      const userData = buildUserPrismaData({ ...data, roleId });
      return await this.prismaService.user.create({
        data: userData,
        select: selectUserFieldsPrisma,
      });
    } catch (error) {
      handlePrismaError({
        error,
        context: { modelName: 'User', uniqueFields: ['email'] },
      });
    }
  }

  async update({ id }: UserIdParamDto, data: User): Promise<User> {
    try {
      const updateData: Partial<User> = {
        ...data,
      };
      return await this.prismaService.user.update({
        where: { id },
        data: updateData,
        select: selectUserFieldsPrisma,
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

  async delete({ id }: UserIdParamDto): Promise<void> {
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
