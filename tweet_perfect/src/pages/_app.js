import React, { useState } from 'react'
import Header from '../components/Header'
import GptResponseContext from '../contexts/GptResponseContext'
import { UserSettingsProvider } from '../contexts/UserSettingsContext'
import { SessionProvider } from "next-auth/react"

// Styles
import '../styles/globals.scss'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [gptResponse1, setGptResponse1] = useState(null)
  const [gptResponse2, setGptResponse2] = useState(null)
  const [gptResponse3, setGptResponse3] = useState(null)

  return (
    <SessionProvider session={pageProps.session}>
      <UserSettingsProvider>
        <div>
          <Header />
          <GptResponseContext.Provider value={{ gptResponse1, setGptResponse1, gptResponse2, setGptResponse2, gptResponse3, setGptResponse3 }}>
            <Component {...pageProps} />
          </GptResponseContext.Provider>
        </div>
      </UserSettingsProvider>
    </SessionProvider>
  )
}


