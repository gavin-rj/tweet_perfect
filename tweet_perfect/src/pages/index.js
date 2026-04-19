import { useState } from 'react'
import Head from 'next/head'
import Form from '../components/Form'
import TweetOutput from '../components/TweetOutput'

export default function Home() {
  return (
    <>
      <Head>
        <title>Tweet Generator - Tweet Perfect</title>
        <meta name="description" content="Generate perfect tweets from your content using AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-secondary-50 dark:bg-secondary-900 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900 py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Generate Perfect Tweets in Seconds
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Transform your content into engaging tweets optimized for any platform. Let AI handle the crafting while you focus on your message.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div>
                <Form />
              </div>

              {/* Output Section */}
              <div>
                <TweetOutput />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 bg-white dark:bg-secondary-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white text-center mb-12">
              Why Choose Tweet Perfect?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  AI-Powered
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Advanced AI generates multiple tweet variations instantly
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  Multi-Platform
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Optimize for Twitter, Facebook, Instagram, or LinkedIn
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  Your Content
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Use your own API key or our default. Full control over your data.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

