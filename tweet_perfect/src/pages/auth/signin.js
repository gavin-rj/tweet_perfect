import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function SignIn() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const callbackUrl = router.query.callbackUrl || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
        callbackUrl: callbackUrl || '/',
      })

      if (result?.error) {
        setError('Invalid username or password. Try admin / 1234')
      } else if (result?.ok) {
        router.push(callbackUrl || '/')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Sign In - Tweet Perfect</title>
        <meta name="description" content="Sign in to Tweet Perfect" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-secondary-900 dark:to-primary-900 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TP</span>
              </div>
              <span className="font-bold text-xl text-secondary-900 dark:text-white">Tweet Perfect</span>
            </Link>
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Welcome Back</h1>
            <p className="text-secondary-600 dark:text-secondary-400 mt-2">Sign in to your account to continue</p>
          </div>

          {/* Sign In Card */}
          <Card className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-100 text-sm">
                {error}
              </div>
            )}

            {/* Credentials Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-smooth"
                  required
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-smooth"
                  required
                  disabled={loading}
                />
              </div>

              {/* Demo Credentials Info */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg text-sm text-blue-700 dark:text-blue-100">
                <strong>Demo Credentials:</strong>
                <br />
                Username: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">admin</code>
                <br />
                Password: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">1234</code>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !username || !password}
                className="w-full px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:bg-secondary-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary-300 dark:border-secondary-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-secondary-800 text-secondary-500 dark:text-secondary-400">Or</span>
              </div>
            </div>

            {/* Info */}
            <div className="text-center">
              <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                Use the demo credentials above to test the application. For production, implement proper authentication with a real database and secure password hashing.
              </p>
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-secondary-600 dark:text-secondary-400 text-sm">
              <Link href="/" className="text-primary-600 dark:text-primary-400 hover:underline">
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}


