import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { User } from '../entities/user.entity';
import { IUserRepository } from './user.interface';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
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
