import { getServerSession } from 'next-auth/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from './prisma'

/**
 * Hardcoded admin user for development
 * In production, query from database and use proper password hashing (bcrypt)
 */
const DEMO_USER = {
  id: '1',
  email: 'admin@tweetperfect.local',
  name: 'Admin User',
  role: 'admin',
}

const DEMO_CREDENTIALS = {
  username: 'admin',
  password: '1234',
}

/**
 * NextAuth configuration options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'admin',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        // Validate credentials exist
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        // DEVELOPMENT ONLY - Hardcoded user
        // In production, validate against database with hashed passwords
        if (
          credentials.username === DEMO_CREDENTIALS.username &&
          credentials.password === DEMO_CREDENTIALS.password
        ) {
          return {
            id: DEMO_USER.id,
            email: DEMO_USER.email,
            name: DEMO_USER.name,
            image: null,
          }
        }

        // Invalid credentials
        return null
      },
    }),
  ],

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Refresh daily
  },

  callbacks: {
    async jwt({ token, user }) {
      // Persist user ID to token when signing in
      if (user) {
        token.id = user.id
        token.role = (user as any).role || 'user'
      }
      return token
    },

    async session({ session, token }) {
      // Add custom fields to session
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
}

/**
 * Get server session with type safety
 */
export async function getSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return getServerSession(req, res, authOptions)
}

/**
 * Require authentication - middleware for API routes
 * Returns user session or null if not authenticated
 */
export async function requireAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res)

  if (!session || !session.user) {
    res.status(401).json({ error: 'Unauthorized' })
    return null
  }

  return session
}

