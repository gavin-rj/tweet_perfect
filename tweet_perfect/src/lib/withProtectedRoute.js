import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

/**
 * Higher-order component to protect pages that require authentication
 */
export function withProtectedRoute(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
      if (status === 'loading') return

      if (status === 'unauthenticated') {
        router.push('/auth/signin?callbackUrl=' + router.asPath)
      } else if (status === 'authenticated') {
        setIsReady(true)
      }
    }, [status, router])

    if (status === 'loading' || !isReady) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-secondary-600 dark:text-secondary-400">Loading...</p>
          </div>
        </div>
      )
    }

    return <Component {...props} />
  }
}

export default withProtectedRoute
