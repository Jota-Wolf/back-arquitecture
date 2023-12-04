import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/services/prisma.service';
import {
  ResponseRole,
  Role,
  RoleFindAllParams,
} from 'src/role/domain/entities/role.entity';
import { IRoleRepository } from '../../domain/interfaces/role-repository.interface';
import { Prisma } from '@prisma/client';
import { RoleParamDto } from 'src/role/domain/dto/update-role.dto';

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

    console.log('roles', roles);
    console.log('total', total);

    return {
      data: roles,
      total,
    };
  }

  async findById({ id }: RoleParamDto): Promise<Role | null> {
    return this.prismaService.role.findUnique({
      where: { id },
    });
  }

  async create(data: Role): Promise<Role> {
    const roleData: Prisma.RoleCreateInput = {
      name: data.name,
    };
    return this.prismaService.role.create({ data: roleData });
  }

  async update({ id }: RoleParamDto, data: Role): Promise<Role> {
    return this.prismaService.role.update({
      where: { id },
      data,
    });
  }

  async delete({ id }: RoleParamDto): Promise<void> {
    await this.prismaService.role.delete({
      where: { id },
    });
  }
}
