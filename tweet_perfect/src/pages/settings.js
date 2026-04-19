import { useState, useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { withProtectedRoute } from '@/lib/withProtectedRoute'
import UserSettingsContext from '@/contexts/UserSettingsContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

function SettingsPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { apiKey, theme, defaultPlatform, saveSettings } = useContext(UserSettingsContext)
  const [localApiKey, setLocalApiKey] = useState(apiKey)
  const [localTheme, setLocalTheme] = useState(theme)
  const [localPlatform, setLocalPlatform] = useState(defaultPlatform)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setLocalApiKey(apiKey)
    setLocalTheme(theme)
    setLocalPlatform(defaultPlatform)
  }, [apiKey, theme, defaultPlatform])

  const handleSaveSettings = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      await saveSettings({
        apiKey: localApiKey,
        theme: localTheme,
        defaultPlatform: localPlatform,
      })
      setMessage('Settings saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setError(err.message || 'Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Settings - Tweet Perfect</title>
        <meta name="description" content="Manage your Tweet Perfect settings" />
      </Head>

      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8">Settings</h1>

          {message && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg text-green-700 dark:text-green-100">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-6">
            {/* Account Information */}
            <Card>
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-300">Email</label>
                  <p className="text-secondary-900 dark:text-white mt-1">{session?.user?.email}</p>
                </div>
                {session?.user?.name && (
                  <div>
                    <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-300">Name</label>
                    <p className="text-secondary-900 dark:text-white mt-1">{session.user.name}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* API Key Configuration */}
            <Card>
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">OpenAI API Configuration</h2>
              <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4">
                Enter your OpenAI API key to use your own API quota. If left blank, the application will use the default API key.
              </p>
              <Input
                label="OpenAI API Key"
                type="password"
                placeholder="sk-..."
                value={localApiKey}
                onChange={(e) => setLocalApiKey(e.target.value)}
                className="mb-2"
              />
              <p className="text-xs text-secondary-500 dark:text-secondary-400">
                Your API key is stored securely and never shared.
              </p>
            </Card>

            {/* Preferences */}
            <Card>
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">Preferences</h2>

              <div className="space-y-4">
                {/* Theme Selection */}
                <div>
                  <label className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">Theme</label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={localTheme === 'light'}
                        onChange={(e) => setLocalTheme(e.target.value)}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="ml-2 text-secondary-900 dark:text-white">Light</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={localTheme === 'dark'}
                        onChange={(e) => setLocalTheme(e.target.value)}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="ml-2 text-secondary-900 dark:text-white">Dark</span>
                    </label>
                  </div>
                </div>

                {/* Default Platform */}
                <div>
                  <label htmlFor="platform" className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">
                    Default Platform
                  </label>
                  <select
                    id="platform"
                    value={localPlatform}
                    onChange={(e) => setLocalPlatform(e.target.value)}
                    className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="twitter">Twitter</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto"
              >
                {loading ? 'Saving...' : 'Save Settings'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push('/')}
                className="w-full md:w-auto"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default withProtectedRoute(SettingsPage)

