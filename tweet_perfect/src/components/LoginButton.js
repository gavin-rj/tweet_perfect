import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button className="nav-link" onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      <div onClick={() => signIn()}>Sign in</div>
    </>
  )
}