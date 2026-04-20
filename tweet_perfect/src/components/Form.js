import React, { useContext, useState } from 'react'
import { useSession } from 'next-auth/react'
import GptResponseContext from '@/contexts/GptResponseContext'
import { PLATFORM_OPTIONS } from '@/constants/platforms'
import Input from './ui/Input'
import Button from './ui/Button'

const Form = () => {
  const { data: session } = useSession()
  const [prompt, setPrompt] = useState('')
  const [examples, setExamples] = useState('')
  const [platform, setPlatform] = useState('twitter')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { setGptResponse1, setGptResponse2, setGptResponse3 } = useContext(GptResponseContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!prompt.trim()) {
      setError('Please enter content to generate tweets from')
      setLoading(false)
      return
    }

    try {
      const result = await fetch('/api/gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: examples ? `Tweet examples: ${examples}\n\nContent: ${prompt}` : prompt,
          platform,
        }),
      })

      if (!result.ok) {
        const data = await result.json()
        throw new Error(data.error || 'Failed to generate tweets')
      }

      const data = await result.json()
      const responses = data.response

      setGptResponse1(responses[0]?.text || '')
      setGptResponse2(responses[1]?.text || '')
      setGptResponse3(responses[2]?.text || '')
    } catch (err) {
      setError(err.message || 'Failed to generate tweets. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-secondary-800 rounded-lg shadow-md border border-secondary-100 dark:border-secondary-700 p-6">
      <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">Generate Tweets</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-100 text-sm">
          {error}
        </div>
      )}

      {!session && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg text-blue-700 dark:text-blue-100 text-sm">
          Sign in to save your tweets and use your own API key
        </div>
      )}

      <div className="space-y-5">
        {/* Content Input */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">
            Content / Whitepaper
            <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            placeholder="Paste the content you want to convert into tweets..."
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-smooth"
          />
          <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
            {prompt.length} characters
          </p>
        </div>

        {/* Tweet Examples */}
        <div>
          <label htmlFor="examples" className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">
            Tweet Examples (Optional)
          </label>
          <textarea
            id="examples"
            placeholder="Add 1-2 examples of tweets in your preferred style. This helps guide the AI to match your tone and voice..."
            rows={3}
            value={examples}
            onChange={(e) => setExamples(e.target.value)}
            className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-smooth"
          />
        </div>

        {/* Platform Selection */}
        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">
            Target Platform
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-smooth"
          >
            {PLATFORM_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} ({opt.limit} characters)
              </option>
            ))}
          </select>
          <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
            Format will be optimized for the selected platform
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating Tweets...
            </span>
          ) : (
            'Generate Tweets'
          )}
        </Button>
      </div>
    </form>
  )
}

export default Form

