import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
};

