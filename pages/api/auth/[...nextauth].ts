/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';

export default NextAuth({
  providers: [
    AppleProvider({
      clientId: process.env.AUTH_APPLE_ID!,
      clientSecret: process.env.AUTH_APPLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
});