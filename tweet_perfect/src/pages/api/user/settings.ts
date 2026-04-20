import { requireAuth } from '@/lib/auth'
import { getUserData, updateUserPreferences } from '@/lib/db-helpers'
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

interface SettingsUpdateRequest {
  apiKey?: string
  theme?: 'light' | 'dark'
  defaultPlatform?: 'twitter' | 'facebook' | 'instagram' | 'linkedin'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await requireAuth(req, res)
  if (!session) return

  const userId = session.user?.id

  if (!userId) {
    return res.status(400).json({ error: 'User ID not found in session' })
  }

  if (req.method === 'GET') {
    try {
      const user = await getUserData(userId)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.status(200).json({
        apiKey: user.apiKey || '',
        theme: user.theme || 'light',
        defaultPlatform: user.defaultPlatform || 'twitter',
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      })
    } catch (error) {
      console.error('Error fetching user settings:', error)
      res.status(500).json({ error: 'Failed to fetch settings' })
    }
  } else if (req.method === 'POST') {
    try {
      const { apiKey, theme, defaultPlatform } = req.body as SettingsUpdateRequest

      // Validate inputs
      if (theme && !['light', 'dark'].includes(theme)) {
        return res.status(400).json({ error: 'Invalid theme' })
      }

      if (defaultPlatform && !['twitter', 'facebook', 'instagram', 'linkedin'].includes(defaultPlatform)) {
        return res.status(400).json({ error: 'Invalid platform' })
      }

      // Build update data
      const updateData: Partial<typeof prisma.user.update> = {} as Partial<typeof prisma.user.update>
      if (theme) (updateData as Record<string, unknown>).theme = theme
      if (defaultPlatform) (updateData as Record<string, unknown>).defaultPlatform = defaultPlatform
      if (apiKey !== undefined) (updateData as Record<string, unknown>).apiKey = apiKey

      // Update user
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData as any,
      })

      // Update preferences if theme is being changed
      if (theme) {
        await updateUserPreferences(userId, { theme })
      }

      res.status(200).json({
        message: 'Settings updated successfully',
        apiKey: updatedUser.apiKey || '',
        theme: updatedUser.theme || 'light',
        defaultPlatform: updatedUser.defaultPlatform || 'twitter',
      })
    } catch (error) {
      console.error('Error updating user settings:', error)
      res.status(500).json({ error: 'Failed to update settings' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

