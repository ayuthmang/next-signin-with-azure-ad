'use client'

import * as React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from '../Link/Link'
import MaxWidthWrapper from '../MaxWidthWrapper/MaxWidthWrapper'
import styled from 'styled-components'

function Header() {
  const { status } = useSession()

  return (
    <MaxWidthWrapper>
      <header className="flex flex-row justify-between px-4 py-4">
        <div>
          <Link href="/" className="text-lg font-bold">
            Home
          </Link>
        </div>
        <nav className="flex flex-row gap-4 [&>*]:">
          {status === 'authenticated' ? (
            <Link
              href="/api/auth/signout"
              className="list-none no-underline"
              onClick={() => signOut()}
            >
              Sign-out
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="list-none no-underline"
              onClick={() => signIn()}
            >
              Sign-in
            </Link>
          )}
        </nav>
      </header>
    </MaxWidthWrapper>
  )
}

export default Header
