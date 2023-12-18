import { User } from '../entities/user.entity';

export function omitSensitiveUserData(userWithSensitiveData: User): User {
  return {
    id: userWithSensitiveData.id,
    name: userWithSensitiveData.name,
    email: userWithSensitiveData.email,
    roleId: userWithSensitiveData.roleId,
    isSuscribed: userWithSensitiveData.isSuscribed,
    isVerified: userWithSensitiveData.isVerified,
  };
}
