import { PrismaClient, type Session } from '@prisma/client';

const prisma = new PrismaClient();

export class SessionService {

    async create(data: Session): Promise<Session> {
        return prisma.session.create({
            data,
        });
    }

  
}