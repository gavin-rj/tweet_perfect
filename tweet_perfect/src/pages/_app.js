import React, {useState} from 'react'
import Header from '../components/Header'
import GptResponseContext from '../contexts/GptResponseContext';


//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from "next-auth/react"
//import '../styles/globals.css';


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [gptResponse1, setGptResponse1] = useState(null);
  const [gptResponse2, setGptResponse2] = useState(null);
  const [gptResponse3, setGptResponse3] = useState(null);
    return (
    //This is used for user auth
    <SessionProvider session={pageProps.session}>
    <div>
      <Header/>
      <GptResponseContext.Provider value={{ gptResponse1, setGptResponse1, gptResponse2, setGptResponse2, gptResponse3, setGptResponse3 }}>
        <Component {...pageProps} />
      </GptResponseContext.Provider>
    </div>
    </SessionProvider>
  )
}
