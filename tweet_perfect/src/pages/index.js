import { useState, useEffect, useContext } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Form from '../components/Form'
import TweetOutput from '../components/TweetOutput'
import GptTest from '../components/GptTest'

const inter = Inter({ subsets: ['latin'] })
//home page
export default function Home() {
  return (
    <>
      <Head>
        <title>Tweet Generator</title>
        <meta name="description" content="Generate Tweets From Examples" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
       <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center'>Tweet Generator</h1>
          </div>
        </div>
          <div className='row'>
            <div className='col-md-6'>
              <h3 className='text-center'>Variable Input</h3>
              <Form/>
            </div>
            <div className='col-md-6'>
              <h3 className='text-center'>Generated Tweets</h3>
              <TweetOutput/>
            </div>
          </div>
          <div>
            <GptTest/>
          </div>
       </div>
      </main>
    </>
  )
}
