import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from '../../../../lib/db.server'

const data = db.user.findMany();

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    //   profile(profile) {
    //     return {
    //       id: profile.id.toString(),
    //       name: profile.name || profile.login,
    //       username: profile.login,
    //       email: profile.email,
    //       image: profile.avatar_url,
    //     };
    //   },
    // }),
    // ...add more providers here
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({
      account, profile
    }) {
      if(account.provider === 'google') {
        return profile.email_verified && profile.email.endsWith('@gmail.com')
    }
      return true
  }
  }
  // callbacks: {
  //   session: ({ session, user }) => ({
  //     ...session,
  //     user: {
  //       ...session.user,
  //       id: user.id,
  //       username: user.username,
  //     },
  //   }),
  // },
};

export default NextAuth(authOptions);
