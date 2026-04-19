import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { withProtectedRoute } from '@/lib/withProtectedRoute'
import DashboardStats from '@/components/DashboardStats'
import TweetHistory from '@/components/TweetHistory'
import QuickActions from '@/components/QuickActions'

function DashboardPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [stats, setStats] = useState(null)
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      const res = await fetch('/api/user/dashboard')
      if (res.status === 401) {
        router.push('/auth/signin')
        return
      }

      if (res.ok) {
        const data = await res.json()
        setStats(data.stats)
        setTweets(data.tweets)
      } else {
        throw new Error('Failed to load dashboard data')
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Dashboard - Tweet Perfect</title>
        <meta name="description" content="Your Tweet Perfect dashboard" />
      </Head>

      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
              Welcome back, {session?.user?.name || 'User'}!
            </h1>
            <p className="text-secondary-600 dark:text-secondary-400 mt-2">
              Here's your tweet generation activity
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-100">
              {error}
            </div>
          )}

          <QuickActions />

          {stats && <DashboardStats stats={stats} />}

          <TweetHistory tweets={tweets} />
        </div>
      </div>
    </>
  )
}

export default withProtectedRoute(DashboardPage)

