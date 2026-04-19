import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Card from '@/components/ui/Card'

export default function AuthError() {
  const router = useRouter()
  const { error } = router.query

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'OAuthSignin':
        return 'Error connecting to the OAuth provider. Please try again.'
      case 'OAuthCallback':
        return 'Error during OAuth callback. Please try signing in again.'
      case 'OAuthCreateAccount':
        return 'Could not create user account. The OAuth provider may already be linked to another account.'
      case 'EmailCreateAccount':
        return 'Could not create user account with email.'
      case 'Callback':
        return 'An error occurred during sign in. Please try again.'
      case 'OAuthAccountNotLinked':
        return 'This OAuth account is not linked to an existing user. Please sign in with a different provider.'
      case 'EmailSignInError':
        return 'Email sign in failed. Please try again.'
      case 'CredentialsSignin':
        return 'Invalid credentials. Please try again.'
      case 'SessionCallback':
        return 'Session callback error. Please try signing in again.'
      case 'Default':
      default:
        return 'An authentication error occurred. Please try again.'
    }
  }

  return (
    <>
      <Head>
        <title>Authentication Error - Tweet Perfect</title>
        <meta name="description" content="Authentication error" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-secondary-50 dark:from-secondary-900 dark:to-red-900 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TP</span>
              </div>
              <span className="font-bold text-xl text-secondary-900 dark:text-white">Tweet Perfect</span>
            </Link>
            <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">Oops!</h1>
            <p className="text-secondary-600 dark:text-secondary-400 mt-2">Something went wrong</p>
          </div>

          {/* Error Card */}
          <Card className="space-y-6">
            {/* Error Message */}
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <p className="text-red-700 dark:text-red-100 text-sm">
                {getErrorMessage(error)}
              </p>
            </div>

            {/* Error Details (if available) */}
            {error && (
              <div className="bg-secondary-50 dark:bg-secondary-700 rounded-lg p-3">
                <p className="text-xs text-secondary-600 dark:text-secondary-300 font-mono">
                  Error Code: {error}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="/auth/signin"
                className="block w-full px-4 py-3 bg-primary-600 text-white text-center rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Try Again
              </Link>
              <Link
                href="/"
                className="block w-full px-4 py-3 bg-secondary-100 dark:bg-secondary-700 text-secondary-900 dark:text-white text-center rounded-lg font-medium hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-secondary-600 dark:text-secondary-400 text-sm">
              If you continue to have issues, please contact support
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
