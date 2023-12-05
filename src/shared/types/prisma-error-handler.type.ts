import { Prisma } from '@prisma/client';

type ContextError = {
  uniqueFields?: string[];
  modelName: string;
  idFieldName?: string;
  id?: string;
};

export type PrismaError = {
  error: Prisma.PrismaClientKnownRequestError;
  context?: ContextError;
};
