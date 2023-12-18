import { hash, verify } from 'argon2';

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password);
  return hashedPassword;
};

export const verifyPassword = async (
  hashedPassword: string,
  password: string,
): Promise<boolean> => {
  const isPasswordValid = await verify(hashedPassword, password);
  return isPasswordValid;
};
