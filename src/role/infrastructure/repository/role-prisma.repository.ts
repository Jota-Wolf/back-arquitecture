import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/services/prisma.service';
import {
  ResponseRole,
  Role,
  RoleFindAllParams,
} from '../../domain/entities/role.entity';
import { IRoleRepository } from '../../domain/interfaces/role-repository.interface';
import { Prisma } from '@prisma/client';
import { RoleParamDto } from '../../domain/dto/update-role.dto';
import { handlePrismaError } from '../../../shared/helpers/prisma-error.handler';
import { CreateRoleDto } from '../../../role/domain/dto/create-role.dto';

@Injectable()
export class RolePrismaRepository implements IRoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(params: RoleFindAllParams): Promise<ResponseRole> {
    const { skip, take, orderBy } = params;
    const where: Prisma.RoleWhereInput = {};

    const [roles, total] = await Promise.all([
      this.prismaService.role.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.prismaService.role.count({ where }),
    ]);

    return {
      data: roles,
      total,
    };
  }

  async findById({ id }: RoleParamDto): Promise<Role | null> {
    return await this.prismaService.role.findUnique({
      where: { id },
    });
  }

  async create(data: CreateRoleDto): Promise<Role> {
    try {
      const roleData: Prisma.RoleCreateInput = {
        name: data.name,
      };
      return await this.prismaService.role.create({ data: roleData });
    } catch (error) {
      handlePrismaError({
        error,
        context: { modelName: 'Role', uniqueFields: ['name'] },
      });
    }
  }

  async update({ id }: RoleParamDto, data: Role): Promise<Role> {
    try {
      const updateData: Partial<Role> = {
        ...data,
      };
      return await this.prismaService.role.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      handlePrismaError({
        error,
        context: {
          modelName: 'Role',
          uniqueFields: ['name'],
          idFieldName: 'id',
          id,
        },
      });
    }
  }

  async delete({ id }: RoleParamDto): Promise<void> {
    try {
      await this.prismaService.role.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError({
        error,
        context: { modelName: 'Role', idFieldName: 'id', id },
      });
    }
  }
}
