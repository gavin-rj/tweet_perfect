import { getServerSession } from 'next-auth/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from './prisma'

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

        // Validate against environment variables
        const adminUsername = process.env.NEXTAUTH_ADMIN_USERNAME
        const adminPassword = process.env.NEXTAUTH_ADMIN_PASSWORD

        if (!adminUsername || !adminPassword) {
          console.error('[Auth] Admin credentials not configured')
          return null
        }

        if (
          credentials.username === adminUsername &&
          credentials.password === adminPassword
        ) {
          return {
            id: '1',
            email: 'admin@tweetperfect.local',
            name: 'Admin User',
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
        token.role = 'admin'
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


