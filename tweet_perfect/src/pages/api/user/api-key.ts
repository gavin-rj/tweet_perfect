import { requireAuth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const session = await requireAuth(req, res)
  if (!session) return

  const userId = session.user?.id
  if (!userId) {
    return res.status(400).json({ error: 'User ID not found' })
  }

  try {
    const { apiKey } = req.body

    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' })
    }

    // Validate the API key works with OpenAI
    try {
      const configuration = new Configuration({
        apiKey: apiKey,
      })
      const openai = new OpenAIApi(configuration)

      // Try a simple API call to validate the key
      await openai.listModels()
    } catch (error: any) {
      return res.status(400).json({
        error: 'Invalid OpenAI API key',
        details: error.message,
      })
    }

    // Save the API key
    await prisma.user.update({
      where: { id: userId },
      data: { apiKey },
    })

    res.status(200).json({
      message: 'API key saved successfully',
    })
  } catch (error) {
    console.error('Error saving API key:', error)
    res.status(500).json({ error: 'Failed to save API key' })
  }
}
