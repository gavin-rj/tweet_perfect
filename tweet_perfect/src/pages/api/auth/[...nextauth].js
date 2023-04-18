import bcrypt from "bcrypt";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '../../../../lib/prisma';

export const authOptions = {

    //Custom Prisma Implementation (Adapter needed)
    adapter: PrismaAdapter(prisma),

    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        CredentialsProvider({
            // The name to display on the sign-in form (e.g., 'Sign in with...')
            name: "Email",
            credentials: {
              email: { label: "Email", type: "email", placeholder: "email@example.com" },
              password: { label: "Password", type: "password" },
            },
            
            authorize: async (credentials) => {
                // Add logic here to look up the user from the credentials supplied
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                
                if (user && (await bcrypt.compare(credentials.password, user.password))) {
                    console.log("test")
                    console.log({ id: user.id, name: user.name, email: user.email, image: user.image })
                    // Any object returned will be saved in `user` property of the JWT
                    return { id: user.id, name: user.name, email: user.email, image: user.image };

                } else {
                    // If you return null or false then the credentials will be rejected
                    return null;
                }
            },
        }),
    ],

  callbacks: {
    async session(session, user) {
        console.log("got here")
        session.user = user;
        return session;
    },
  },  

}

export default NextAuth(authOptions);