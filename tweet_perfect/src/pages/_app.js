import React, { useState } from 'react'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react'
import Header from '../components/Header'
import GptResponseContext from '../contexts/GptResponseContext'
import { UserSettingsProvider } from '../contexts/UserSettingsContext'
import { SessionProvider } from "next-auth/react"

// Styles
import '../styles/globals.scss'

export default function App({ Component, pageProps }) {
  const [gptResponse1, setGptResponse1] = useState(null)
  const [gptResponse2, setGptResponse2] = useState(null)
  const [gptResponse3, setGptResponse3] = useState(null)

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider>
        <UserSettingsProvider>
          <div>
            <Header />
            <GptResponseContext.Provider value={{ gptResponse1, setGptResponse1, gptResponse2, setGptResponse2, gptResponse3, setGptResponse3 }}>
              <Component {...pageProps} />
            </GptResponseContext.Provider>
          </div>
        </UserSettingsProvider>
      </SessionProvider>
      <Analytics />
    </>
  )
}



