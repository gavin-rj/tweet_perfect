import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import LoginButton from './LoginButton.js'
import UserSettingsContext from '@/contexts/UserSettingsContext'

const Header = () => {
  const { data: session } = useSession()
  const { theme, setTheme } = useContext(UserSettingsContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <header className="bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TP</span>
            </div>
            <span className="font-bold text-lg text-secondary-900 dark:text-white hidden sm:inline">
              Tweet Perfect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-smooth">
              Home
            </Link>
            <Link href="/about" className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-smooth">
              About
            </Link>
            {session && (
              <>
                <Link href="/dashboard" className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-smooth">
                  Dashboard
                </Link>
                <Link href="/settings" className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-smooth">
                  Settings
                </Link>
              </>
            )}
          </div>

          {/* Right Side - Theme Toggle & Auth */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-smooth"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414zm2.828-2.828l1.414-1.414a1 1 0 00-1.414-1.414l-1.414 1.414a1 1 0 001.414 1.414zm0 2.828l1.414 1.414a1 1 0 11-1.414 1.414l-1.414-1.414a1 1 0 111.414-1.414zM4.464 4.465L5.878 3.05a1 1 0 00-1.414-1.414L3.05 3.05a1 1 0 001.414 1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            <div className="hidden md:block">
              <LoginButton />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-secondary-200 dark:border-secondary-700 py-4 space-y-3">
            <Link href="/" className="block text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 py-2">
              Home
            </Link>
            <Link href="/about" className="block text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 py-2">
              About
            </Link>
            {session && (
              <>
                <Link href="/dashboard" className="block text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 py-2">
                  Dashboard
                </Link>
                <Link href="/settings" className="block text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 py-2">
                  Settings
                </Link>
              </>
            )}
            <div className="pt-2 border-t border-secondary-200 dark:border-secondary-700">
              <LoginButton />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

