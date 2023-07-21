import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AuthOptions, getServerSession } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { db } from './db';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth',
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
};

export function getAuthSession() {
  return getServerSession(authOptions);
}
