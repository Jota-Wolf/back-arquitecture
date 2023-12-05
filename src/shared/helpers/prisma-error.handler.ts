import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { type PrismaError } from '../types/prisma-error-handler.type';

export function handlePrismaError({ error, context }: PrismaError) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0];
      if (field && context?.uniqueFields?.includes(field)) {
        throw new BadRequestException(
          `The ${field} provided for the ${context.modelName} already exists.`,
        );
      }
    }
    if (error.code === 'P2025' && context?.idFieldName && context?.id) {
      throw new NotFoundException(
        `The ${context.modelName} with ${context.idFieldName} ${context.id} does not exist.`,
      );
    }
  }

  throw new InternalServerErrorException('An unexpected error occurred');
}
