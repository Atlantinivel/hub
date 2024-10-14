import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '../../../../libs/prismadb';

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // if (!user || !user?.hashedPassword) {
        //   throw new Error('Invalid credentials');
        // }

        // const isCorrectPassword = await bcrypt.compare(
        //   credentials.password,
        //   user.hashedPassword,
        // );

        // if (!isCorrectPassword) {
        //   throw new Error('Invalid credentials');
        // }

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/hub',
    signOut: '/login',
    error: '/login',
  },

  callbacks: {
    // @ts-ignore
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
      }
      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    // @ts-ignore
    session: async ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        given_name: token.given_name || token.firstname,
        family_name: token.family_name || token.lastname,
        id: token.id,
        picture: token.picture,
        access_token: token.access_token,
        username: token.username,
        phone: token.phone,
        backId: token.backId,
        jwt: token.jwt,
      },
    }),
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions as config };
