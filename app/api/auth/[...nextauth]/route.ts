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

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

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

  callbacks: {
    async jwt({ token, user }) {
      // console.log('TOKEN', token, user);

      if (user) {
        // @ts-ignore
        token = user;
      }

      return Promise.resolve(token);
    },
    // @ts-ignore
    async signIn({ user, account, profile }) {
      // Update the user object with additional information
      user = { ...user, ...profile };
      // Save the provider to the session object
      // console.log('user', user);

      return { user, account, profile };
    },
    // @ts-ignore
    async session(session, user, token) {
      // console.log('session',session, user, token);

      // if (user !== null) {
      //   session.user = user;
      // }
      // return await session;
      console.log('dsadasda', session, token);

      // session.user = token.user;
      // you might return this in new version
      return Promise.resolve(session);
      // return {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     ...token,
      //   },
      // }
    },
    // async session(session, user, token) {
    //   // If you have additional user information, you can fetch it here
    //   console.log('user', session, user, token);

    //   if (user && user.id) {
    //     const additionalUserInfo = await prisma.user.findUnique({
    //       where: { id: user._id },
    //       // Include any additional fields you need
    //     });

    //     // Merge additional information into the session
    //     return {
    //       ...session,
    //       user: {
    //         ...session.user,
    //         ...additionalUserInfo,
    //       },
    //     };
    //   }
    // },
    // async session(session, token ) {
    //   console.log('dsadasda', session, token);

    //   session.user = token.user;
    //   // you might return this in new version
    //   return Promise.resolve(session)
    // },

    // async jwt({ token }) {
    //   return await token;
    // },
  },
  pages: {
    signIn: '/hub',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions as config };
