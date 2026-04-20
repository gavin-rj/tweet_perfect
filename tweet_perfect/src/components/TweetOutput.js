import React, { useContext, useState } from 'react'
import GptResponseContext from '@/contexts/GptResponseContext'
import { PLATFORM_LIMITS, getPlatformLimit } from '@/constants/platforms'
import Card from './ui/Card'
import Button from './ui/Button'

const TweetOutput = () => {
  const { gptResponse1, gptResponse2, gptResponse3 } = useContext(GptResponseContext)
  const [copiedIndex, setCopiedIndex] = useState(null)

  const tweets = [gptResponse1, gptResponse2, gptResponse3]

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const allEmpty = tweets.every((t) => !t)

  if (allEmpty) {
    return (
      <Card className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-secondary-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">No tweets generated yet</h3>
        <p className="text-secondary-600 dark:text-secondary-400">Fill out the form and click Generate to create tweets</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">Generated Tweets</h2>

      {tweets.map((tweet, index) => (
        <Card key={index} className="hover:shadow-lg transition-smooth">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-1">
                Tweet {index + 1}
              </h3>
              {tweet && (
                <p className="text-xs text-secondary-500 dark:text-secondary-400">
                  {tweet.length} characters
                  {tweet.length > 280 && <span className="text-red-500 ml-2">⚠️ Exceeds 280 char limit</span>}
                </p>
              )}
            </div>
            {tweet && (
              <Button
                variant={copiedIndex === index ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => handleCopy(tweet, index)}
                className="ml-2"
              >
                {copiedIndex === index ? (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Copied!
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </span>
                )}
              </Button>
            )}
          </div>

          {tweet ? (
            <p className="text-secondary-900 dark:text-white leading-relaxed p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg border border-secondary-200 dark:border-secondary-600 whitespace-pre-wrap break-words">
              {tweet}
            </p>
          ) : (
            <div className="p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg text-center">
              <p className="text-secondary-500 dark:text-secondary-400 text-sm">Tweet {index + 1}</p>
            </div>
          )}
        </Card>
      ))}

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
        <p className="text-sm text-blue-700 dark:text-blue-100">
          💡 <strong>Tip:</strong> Twitter has a 280 character limit. Consider shortening longer tweets or splitting them into a thread.
        </p>
      </div>
    </div>
  )
}

export default TweetOutput

