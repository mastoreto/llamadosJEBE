import { PrismaClient, Prisma, type User} from '@prisma/client';
import { formatDatePostgres } from '@jebe/utils/functions';
// Inicializar el cliente de Prisma
const prisma = new PrismaClient();

// Definir los tipos de entrada para crear un usuario
export interface CreateUserInput {
  userId?: bigint;
  email: string;
  googleId?: string;
  userName: string;
  userSurname: string;
  userDateOfBirthday: string;
  userCivilStatusId: bigint;
  userSexId: bigint;
  userChurchId: bigint;
  userResidenceStateId: bigint;
  userRoleId: bigint;
  userPassword: string;
  emailVerified?: Date;
}

export class UserService {
  
  public async createUser(input: CreateUserInput) {
    try {

      const userData = {
        userId: input.userId,
        email: input.email,
        user_name: input.userName,
        user_surname: input.userSurname,
        user_date_of_birthday: formatDatePostgres(input.userDateOfBirthday),
        user_civil_status_id: input.userCivilStatusId,
        user_sex_id: input.userSexId,
        user_church_id: input.userChurchId,
        user_residence_state_id: input.userResidenceStateId,
        user_role_id: input.userRoleId,
        user_password: input.userPassword,
        emailVerified: input.emailVerified
      }
      const user: User = await prisma.user.create({
        data: userData as unknown as Prisma.UserCreateInput,
      });

      return user;
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('El email o Google ID ya está registrado');
        }
      }
      throw new Error('No se pudo crear el usuario');
    }
  }

  // Método para obtener un usuario por ID
  public async getUserById(userId: bigint) {
    try {
      const user = await prisma.user.findUnique({
        where: { 
          userId: userId 
        }
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      throw new Error('No se pudo obtener el usuario');
    }
  }

  // Método para actualizar un usuario
  public async updateUser(userId: bigint, updates: Partial<CreateUserInput>) {
    try {
      const updatedUser = await prisma.user.update({
        where: { userId },
        data: updates,
      });

      return updatedUser;
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw new Error('No se pudo actualizar el usuario');
    }
  }

  // Método para eliminar un usuario por ID
  public async deleteUser(userId: bigint) {
    try {
      await prisma.user.delete({
        where: { userId },
      });

      return { message: 'Usuario eliminado exitosamente' };
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw new Error('No se pudo eliminar el usuario');
    }
  }
}
