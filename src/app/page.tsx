'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import MaxWidthWrapper from './components/MaxWidthWrapper/MaxWidthWrapper'
import {
  getListItemsInMyDrive,
  getMe,
  getSearchItemInMyDrive,
} from './lib/microsoft-graph'
import clsx from 'clsx'
import Button from './components/Button/Button'
import { debounce } from 'lodash'

export default async function Home() {
  return (
    <MaxWidthWrapper>
      <main className="min-h-full grid grid-cols-2 gap-6">
        <UserProfile />
        <OneDriveFiles />
        <SearchFiles />
      </main>
    </MaxWidthWrapper>
  )
}

function OneDriveFiles() {
  const [result, setResult] = React.useState<null | Awaited<
    ReturnType<typeof getListItemsInMyDrive>
  >>(null)
  const { data: session, status } = useSession()

  React.useEffect(() => {
    async function runEffect() {
      if (session && session.user) {
        const result = await getListItemsInMyDrive(session.user.accessToken!)
        setResult(result)
      }
    }
    runEffect()
  }, [session, result])

  if (status === 'unauthenticated') {
    return <p>Please login to view the files</p>
  }

  if (status === 'loading') {
    return <p>Loading user files ...</p>
  }

  return (
    <div>
      <h2 className="text-lg mb-2">Files</h2>
      {result && (
        <ul className="list-disc">
          {result?.value.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function UserProfile() {
  const [result, setResult] = React.useState<null | Awaited<
    ReturnType<typeof getMe>
  >>(null)
  const { data: session, status } = useSession()

  React.useEffect(() => {
    async function runEffect() {
      if (session && session.user) {
        const result = await getMe(session.user.accessToken!)
        setResult(result)
        console.log({ userProfile: result })
      }
    }
    runEffect()
  }, [session])

  if (status === 'unauthenticated') {
    return <p>Please login to view user profile</p>
  }

  if (status === 'loading') {
    return <p>Loading user profile ...</p>
  }

  if (status === 'authenticated')
    return (
      <div className="flex flex-col">
        <h2 className="text-lg">User Profile</h2>
        <ul className="list-disc">
          <li>
            <p>Name: {result?.displayName}</p>
          </li>
          <li>
            <p>Email: {result?.mail}</p>
          </li>
          <li>
            <figure>
              <figcaption>A user profile image</figcaption>
              <Image
                src={session.user?.image ?? ''}
                alt="user profile"
                width={200}
                height={200}
              />
            </figure>
          </li>
        </ul>
      </div>
    )
}

function SearchFiles() {
  const { data: session, status } = useSession()
  const [keyword, setKeyword] = React.useState('')
  const [result, setResult] = React.useState<null | Awaited<
    ReturnType<typeof getSearchItemInMyDrive>
  >>(null)

  const search = async () => {
    if (session && session.user) {
      const result = await getSearchItemInMyDrive(
        session.user.accessToken!,
        keyword
      )
      setResult(result)
      console.log({ fileSearchResult: result })
    }
  }

  const debouncedSearch = debounce(search, 500)

  const handleFormSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      await debouncedSearch()
    },
    [debouncedSearch]
  )

  React.useEffect(() => {
    debouncedSearch()

    return () => {
      debouncedSearch.cancel()
    }
  }, [keyword, handleFormSubmit, debouncedSearch])

  if (status === 'unauthenticated') {
    return <p>Please login to search your files</p>
  }

  if (status === 'loading') {
    return <p>Loading search files ...</p>
  }

  return (
    <div>
      <h2 className="text-lg mb-2">Search Files</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-6">
          <label
            htmlFor="searchInput"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Enter your keyword
          </label>
          <div className="flex flex-row items-center justify-center">
            <input
              type="text"
              id="searchInput"
              className={clsx(
                'w-full inline-block p-2.5 mr-2',
                'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg',
                'focus:ring-blue-500 focus:border-blue-500'
              )}
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              required
            />
            <Button type="submit">Search</Button>
          </div>
        </div>
      </form>

      <div>
        <p>Search result:</p>
        {result && (
          <ul className="list-disc">
            {result?.value.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
