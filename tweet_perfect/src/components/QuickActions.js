import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function QuickActions() {
  return (
    <Card className="mb-8">
      <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-3">
        <Link href="/">
          <Button variant="primary">
            Generate New Tweet
          </Button>
        </Link>
        <Link href="/settings">
          <Button variant="secondary">
            View Settings
          </Button>
        </Link>
      </div>
    </Card>
  )
}
