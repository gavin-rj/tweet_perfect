import { requireAuth } from '@/lib/auth'
import { getUserStats, getUserTweets } from '@/lib/db-helpers'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const session = await requireAuth(req, res)
  if (!session) return

  const userId = session.user?.id
  if (!userId) {
    return res.status(400).json({ error: 'User ID not found' })
  }

  try {
    const stats = await getUserStats(userId)
    const tweets = await getUserTweets(userId, 20)

    res.status(200).json({
      stats,
      tweets,
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    res.status(500).json({ error: 'Failed to fetch dashboard data' })
  }
}
