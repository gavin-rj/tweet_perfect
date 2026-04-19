import Head from 'next/head'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Tweet Perfect</title>
        <meta name="description" content="Learn about Tweet Perfect - AI-powered tweet generation tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-secondary-50 dark:bg-secondary-900 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900 py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Tweet Perfect
            </h1>
            <p className="text-xl text-primary-100">
              Transforming ideas into engaging content, powered by AI
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            {/* Mission */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                Tweet Perfect was born from a simple idea: creating engaging social media content should be fast, easy, and accessible to everyone. Whether you're a content creator, entrepreneur, or marketing professional, our AI-powered tool helps you craft the perfect tweet in seconds.
              </p>
              <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                We believe that great content comes from great ideas—our job is to help you express those ideas in the most engaging way possible across any platform.
              </p>
            </div>

            {/* How It Works */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg border border-secondary-200 dark:border-secondary-700">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                    Share Your Content
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Paste any content, article, or idea you want to turn into tweets
                  </p>
                </div>

                <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg border border-secondary-200 dark:border-secondary-700">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                    Choose Your Platform
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Select your target platform (Twitter, Facebook, Instagram, LinkedIn)
                  </p>
                </div>

                <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg border border-secondary-200 dark:border-secondary-700">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                    Get AI-Generated Tweets
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Receive 3 optimized tweet variations ready to share
                  </p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg border border-secondary-200 dark:border-secondary-700">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                    🚀 AI-Powered Generation
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Advanced AI algorithms generate multiple unique variations tailored to your content
                  </p>
                </div>

                <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg border border-secondary-200 dark:border-secondary-700">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                    🎯 Platform Optimization
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Each tweet is optimized for character limits and engagement on your chosen platform
                  </p>
                </div>

                <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg border border-secondary-200 dark:border-secondary-700">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                    🎨 Style Preservation
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Provide examples to guide the AI to match your unique voice and tone
                  </p>
                </div>

                <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg border border-secondary-200 dark:border-secondary-700">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                    🔒 Your Data, Your Control
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Use your own API key or our default. Full transparency about data usage
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900 rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Perfect Your Tweets?
              </h2>
              <p className="text-primary-100 mb-8">
                Start generating engaging tweets in seconds
              </p>
              <Link href="/" className="inline-block px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white dark:bg-secondary-800 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  Do I need to sign up to use Tweet Perfect?
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  You can generate tweets without signing up! However, signing in allows you to save your tweets, use your own API key, and access more features.
                </p>
              </div>

              <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  What AI model does Tweet Perfect use?
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  We use OpenAI's GPT models to generate high-quality, contextually relevant tweets tailored to your content and platform.
                </p>
              </div>

              <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  Can I use my own API key?
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Yes! In your settings, you can configure your own OpenAI API key for full control over your usage and costs.
                </p>
              </div>

              <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  Is my content private?
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Absolutely. Your content is processed securely and is not stored or used for training purposes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

