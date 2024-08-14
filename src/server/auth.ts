import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type Account
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@jebe/env";
import { db } from "@jebe/server/db";

import { UserService } from "@jebe/server/api/service/User.service";

import Logger from "@jebe/server/logs";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      email: string;
      fullName: string;
      image: string;
      user_id: bigint;
    } & DefaultSession["user"];
  }

   interface User {
    user_id: bigint;
    email: string;
    image: string;
    googleId: string;
    user_name: string;
    user_surname: string;
    name: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

const userService = new UserService();

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 5 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({
      user, 
      account, 
      profile
    }) {
      const emailDirection = profile?.email ?? "";

      console.log("Prof");
      console.log(profile);
      
      const userRegistrated = await userService.getUserByEmail(emailDirection);

      if (userRegistrated !== null) {
        return true;
      } else {
        if (account === null) { 
          return false;
        }
        const accountData: Account = account;
        
        const userCreated = await userService.createUserWithGoogle(user, accountData);

        if (userCreated === null) {
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, profile }) {
      console.log("token")
      console.log(profile)
      if (user) {
        token.user_id = user.user_id;
        token.fullName = `${user.user_name} ${user.user_surname}`;
        token.image = profile?.picture;   
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.user_id = token.user_id as bigint;
        session.user.fullName = token.fullName as string;
        session.user.image = token.image as string;
      }
     
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
  

};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
