import Card from '@/components/ui/Card'

export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
            {stats?.totalTweets || 0}
          </div>
          <p className="text-secondary-600 dark:text-secondary-400 mt-2">Total Tweets Generated</p>
        </div>
      </Card>

      <Card>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
            {stats?.platformUsage?.length || 0}
          </div>
          <p className="text-secondary-600 dark:text-secondary-400 mt-2">Platforms Used</p>
        </div>
      </Card>

      <Card>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
            {(() => {
              const platforms = stats?.platformUsage || []
              return platforms.length > 0
                ? platforms.reduce((max, p) => (p.count > max.count ? p : max)).platform.toUpperCase()
                : 'N/A'
            })()}
          </div>
          <p className="text-secondary-600 dark:text-secondary-400 mt-2">Most Used Platform</p>
        </div>
      </Card>
    </div>
  )
}
