import { getServerSession } from 'next-auth/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

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

/**
 * Export auth options for use in [...nextauth].js
 */
export { authOptions }
