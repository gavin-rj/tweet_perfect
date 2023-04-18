import bcrypt from "bcrypt";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '../../../../lib/prisma';

export const authOptions = {
    debug: true,

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
                    console.log({ id: user.id, name: user.name, email: user.email, image: user.image })
                    console.log('Authorize: User found and password matched');
                    // Any object returned will be saved in `user` property of the JWT
                    return { id: user.id, name: user.name, email: user.email, image: user.image };

                } else {
                    // If you return null or false then the credentials will be rejected
                    console.log('Authorize: User not found or password mismatch');
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
          if (user) {
            token.id = user.id;
            token.name = user.name;
            token.email = user.email;
            token.image = user.image;
          }
          return token;
        },
        async session(session, token) {
          console.log('token:', token);
          console.log('session before:', session);
          session.user.id = token.id;
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.image = token.image;
          console.log('session after:', session);
          return session;
        },
      },
      
      
}

export default NextAuth(authOptions);