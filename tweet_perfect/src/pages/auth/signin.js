import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function SignIn() {
  const router = useRouter()
  const callbackUrl = router.query.callbackUrl || '/'

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
            {/* GitHub Sign In */}
            <button
              onClick={() => signIn('github', { callbackUrl })}
              className="w-full px-4 py-3 bg-secondary-900 dark:bg-white text-white dark:text-secondary-900 rounded-lg font-medium hover:bg-secondary-800 dark:hover:bg-secondary-100 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.194.092-.929.35-1.544.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.447-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.817a9.565 9.565 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.191 20 14.441 20 10.017 20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              <span>Continue with GitHub</span>
            </button>

            {/* Google Sign In */}
            <button
              onClick={() => signIn('google', { callbackUrl })}
              className="w-full px-4 py-3 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white border border-secondary-300 dark:border-secondary-600 rounded-lg font-medium hover:bg-secondary-50 dark:hover:bg-secondary-600 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary-300 dark:border-secondary-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-secondary-800 text-secondary-500 dark:text-secondary-400">Or continue</span>
              </div>
            </div>

            {/* Info */}
            <div className="text-center">
              <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                Sign in with GitHub or Google to access your dashboard, manage settings, and save your tweets.
              </p>
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-secondary-600 dark:text-secondary-400 text-sm">
              Don't have an account? <br />
              Sign in with GitHub or Google to create one instantly.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

