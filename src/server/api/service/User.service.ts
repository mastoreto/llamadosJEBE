import { PrismaClient, Prisma, type User} from '@prisma/client';
import { formatDatePostgres } from '@jebe/utils/functions';
import Role from '@jebe/server/Enums/Role.enum';
import { type Account, type User as NextAuthUser } from 'next-auth';
import { AccountService } from './Account.service';
import { SessionService } from './Session.service';

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

  private accountService: AccountService;
  private sessionService: SessionService;

  constructor() {
    this.accountService = new AccountService();
    this.sessionService = new SessionService();
  }
  
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
      } as unknown as Prisma.UserUncheckedCreateInput;
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

  public async createUserWithGoogle(user: NextAuthUser, account: Account) {
    
    try {
      const fullName = user?.name;
      const names = fullName.split(' '); // Suponemos que el nombre y apellido están separados por un espacio
  
      const firstName = names[0]; // El primer elemento es el nombre
      const lastName = names.slice(1).join(' ');
  

      const userCreated = await prisma.user.create({
        data: {
          userId: BigInt(Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 10000000),
          email: user.email,
          googleId: user.googleId,
          user_name: firstName!,
          user_surname: lastName,
          user_date_of_birthday: formatDatePostgres(new Date().toISOString()),
          user_civil_status_id: BigInt(1),
          user_sex_id: BigInt(1),
          user_church_id: BigInt(110),
          user_residence_state_id: BigInt(1),
          user_role_id: Role.Participant,
          user_password: "",
          emailVerified: null,
        }
      });

      if (userCreated === null) {
        throw new Error('No se pudo crear el usuario');
      }

      const createAccount = await this.accountService.createAccount(
        userCreated.userId,
        account
      );

      if (createAccount === null) {
        throw new Error('No se pudo crear la cuenta');
      }

      return userCreated;

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

  public async getUserByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { 
          email: email 
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
