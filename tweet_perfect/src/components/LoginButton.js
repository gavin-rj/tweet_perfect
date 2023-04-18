import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from 'react';

  export default function Component() {
    const { data: session, status } = useSession()
    useEffect(() => {
      console.log('Session in useEffect:', session);
    }, [session]);
    if (session) {
      return (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )
    }
    return (
      <>
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )
  }