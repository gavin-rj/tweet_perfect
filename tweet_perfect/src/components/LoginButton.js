import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-secondary-600 dark:text-secondary-300">
          {session.user.email}
        </span>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-secondary-100 dark:bg-secondary-700 text-secondary-900 dark:text-white rounded-lg font-medium hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn()}
      className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
    >
      Sign in
    </button>
  )
}