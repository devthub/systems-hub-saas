import { getServerSession } from 'next-auth';
import Credentials from 'node_modules/next-auth/providers/credentials';

import UserService from './services/user/user-service';

import type { NextAuthOptions, User } from 'next-auth';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },

  secret: process.env.TOKEN_SECRET,

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async jwt({ token, account, profile, user }) {
      if (account && account.type === 'credentials') {
        token.userId = account.providerAccountId; // this is Id that coming from authorize() callback

        token.user = user;
      }

      return token;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async session({ session, token, user }) {
      if (token) {
        session.user._id = token.userId; //(3)
        session.user = token.user;
      }

      return session;
    },
  },

  jwt: { secret: process.env.TOKEN_SECRET, maxAge: 30 * 24 * 60 * 60 },

  pages: {
    signIn: '/signin', //(4) custom signin page path
  },

  providers: [
    Credentials({
      name: 'Credentials',

      credentials: {
        usernameOrEmail: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter Username',
        },
        password: { label: 'Password', type: 'password' },
        otpCode: { label: 'OTP', type: 'text' },
      },

      authorize: async (
        credentials: Record<'usernameOrEmail' | 'password' | 'otpCode', string> | undefined
      ): Promise<User | null> => {
        try {
          const { data } = await UserService.authenticate({
            usernameOrEmail: credentials?.usernameOrEmail as string,
            password: credentials?.password as string,
            otpCode: credentials?.otpCode,
          });

          if (!data.user) return null;

          return data?.user as User;
        } catch (error) {
          console.error('🚀 ~ file: authOptions.ts:31 ~ authorize: ~ error:', error);

          throw new Error(
            JSON.stringify({
              message: (error as Error).message,
              status: false,
            })
          );
        }
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions); //(6)
