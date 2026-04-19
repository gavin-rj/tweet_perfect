import Card from '@/components/ui/Card'

export default function TweetHistory({ tweets }) {
  if (!tweets || tweets.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <p className="text-secondary-600 dark:text-secondary-400 text-lg">No tweets generated yet</p>
          <p className="text-secondary-500 dark:text-secondary-500 text-sm mt-2">
            Start generating tweets to see them appear here
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Recent Tweets</h2>
      <div className="space-y-3">
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg border border-secondary-200 dark:border-secondary-600 hover:shadow-md transition-smooth"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="inline-block px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded">
                {tweet.platform}
              </span>
              <span className="text-xs text-secondary-500 dark:text-secondary-400">
                {new Date(tweet.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-secondary-900 dark:text-white break-words">{tweet.content}</p>
            <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2">
              {tweet.content.length} characters
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}

