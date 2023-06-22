import { signIn } from 'next-auth/react'

export default function Home() {
  function handleLoginWithMicrosoftClick(
    e: React.MouseEvent<HTMLAnchorElement>
  ) {
    e.preventDefault()
    signIn('azure-ad')
  }

  return (
    <main className="flex min-h-full flex-col items-center justify-between p-24">
      <a href="/api/auth/signin" onClick={handleLoginWithMicrosoftClick}>
        Login with Microsoft
      </a>
    </main>
  )
}
