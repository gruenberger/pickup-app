import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import DiscordProvider from "next-auth/providers/discord";
import { db } from "@/lib/db";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

// const DISCORD_CLIENT_ID = process.env.DISCORD_ID;
// const DISCORD_SECRET = process.env.DISCORD_SECRET;

if(!GOOGLE_CLIENT_ID || !GOOGLE_SECRET ){
    throw new Error("Missing OAuth keys.")
}

export const { handlers: {GET,POST}, auth, signOut, signIn } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_SECRET,
        })
    ],
    callbacks: {
        async session({session, user}: any) {
            if(session && user){
                session.user.id = user.id;
            }
            return session;
        }
    },
});
