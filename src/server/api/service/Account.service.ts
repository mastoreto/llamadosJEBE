import { PrismaClient, type Account } from '@prisma/client';
import { type Account as NextAccount } from 'next-auth';
const prisma = new PrismaClient();

export class AccountService {
    async getAccountById(id: string): Promise<Account | null> {
        const account = await prisma.account.findUnique({ where: { id: id } });
        if(!account) {
            return null;
        }
        return account;
    }

    async createAccount(userId: bigint, account: NextAccount): Promise<Account> {

        const newAccount = await prisma.account.create({ 
            data:{
                userId,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
            }
        });

        if(!newAccount) {
            throw new Error('No se pudo crear la cuenta');
        }

        return newAccount;
    }

    async updateAccount(id: string, data: Partial<Account>): Promise<Account | null> {
        const account = await prisma.account.update({ where: { id }, data });
        return account;
    }

    async deleteAccount(id: string): Promise<Account | null> {
        const account = await prisma.account.delete({ where: { id } });
        return account;
    }
}