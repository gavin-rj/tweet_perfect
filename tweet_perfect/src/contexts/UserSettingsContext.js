import { createContext, useState, useEffect, useMemo } from 'react'
import { useSession } from 'next-auth/react'

const UserSettingsContext = createContext({
  apiKey: '',
  setApiKey: () => {},
  theme: 'light',
  setTheme: () => {},
  defaultPlatform: 'twitter',
  setDefaultPlatform: () => {},
  loading: true,
  saveSettings: async () => {},
})

export function UserSettingsProvider({ children }) {
  const { data: session } = useSession()
  const [apiKey, setApiKey] = useState('')
  const [theme, setTheme] = useState('light')
  const [defaultPlatform, setDefaultPlatform] = useState('twitter')
  const [loading, setLoading] = useState(true)

  // Load user settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        if (session?.user?.id) {
          const res = await fetch('/api/user/settings')
          if (res.ok) {
            const data = await res.json()
            setApiKey(data.apiKey || '')
            setTheme(data.theme || 'light')
            setDefaultPlatform(data.defaultPlatform || 'twitter')
          }
        }
      } catch (error) {
        console.error('Failed to load settings:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [session?.user?.id])

  // Update DOM theme - separated to prevent race conditions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement
      if (theme === 'dark') {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  }, [theme])

  const saveSettings = async (settings) => {
    try {
      const res = await fetch('/api/user/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (!res.ok) {
        throw new Error('Failed to save settings')
      }

      const data = await res.json()
      if (settings.apiKey !== undefined) setApiKey(settings.apiKey)
      if (settings.theme !== undefined) setTheme(settings.theme)
      if (settings.defaultPlatform !== undefined) setDefaultPlatform(settings.defaultPlatform)

      return data
    } catch (error) {
      console.error('Error saving settings:', error)
      throw error
    }
  }

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      apiKey,
      setApiKey,
      theme,
      setTheme,
      defaultPlatform,
      setDefaultPlatform,
      loading,
      saveSettings,
    }),
    [apiKey, theme, defaultPlatform, loading]
  )

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  )
}

export default UserSettingsContext
