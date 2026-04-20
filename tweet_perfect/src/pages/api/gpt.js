import { OpenAIApi, Configuration } from 'openai'
import { requireAuth } from '@/lib/auth'
import { getUserData, saveTweet } from '@/lib/db-helpers'

// Constants
const MAX_PROMPT_LENGTH = 5000
const MIN_PROMPT_LENGTH = 1

const fetchGPTResponse = async (prompt, apiKey) => {
  const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANISATION,
    apiKey: apiKey || process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  const gptResponse = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 1000,
    n: 3,
    temperature: 0.7,
  })

  return gptResponse.data.choices
}

export default async (req, res) => {
  if (req.method === 'POST') {
    // Authenticate user
    const session = await requireAuth(req, res)
    if (!session) return

    const userId = session.user?.id
    if (!userId) {
      return res.status(400).json({ error: 'User ID not found in session' })
    }

    const { prompt, platform } = req.body

    // Validate input
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    // Validate prompt length
    const promptLength = String(prompt).trim().length
    if (promptLength < MIN_PROMPT_LENGTH) {
      return res.status(400).json({ error: 'Prompt cannot be empty' })
    }
    if (promptLength > MAX_PROMPT_LENGTH) {
      return res.status(400).json({
        error: `Prompt exceeds maximum length of ${MAX_PROMPT_LENGTH} characters (current: ${promptLength})`,
      })
    }

    try {
      // Get user data to check for custom API key
      const user = await getUserData(userId)
      const apiKey = user?.apiKey || process.env.OPENAI_API_KEY

      if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' })
      }

      // Generate tweets
      const gptResponse = await fetchGPTResponse(prompt, user?.apiKey)

      // Save tweets to database if platform is specified
      if (platform && gptResponse && gptResponse.length > 0) {
        try {
          await Promise.all(
            gptResponse.map((choice) =>
              saveTweet(userId, choice.text, platform)
            )
          )
        } catch (saveError) {
          console.error('Error saving tweets:', saveError)
          // Don't fail the response if saving tweets fails
        }
      }

      res.status(200).json({ response: gptResponse })
    } catch (error) {
      console.error(`[GPT API] Error for user ${userId}:`, error.message)

      if (error.response?.status === 401) {
        return res.status(401).json({ error: 'Invalid API key' })
      }

      res.status(500).json({ error: 'Error fetching GPT response' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

  