'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const publicPaths = ['/auth']

interface AuthRedirectWrapperProps {
  pathname: string
}

export async function authRedirect({ pathname }: AuthRedirectWrapperProps) {
  const cookieStore = await cookies()
  const isAuthenticated = !!cookieStore.get('token')

  if (isAuthenticated && publicPaths.includes(pathname)) {
    redirect('/')
  }

  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    redirect('/auth/sign-in')
  }
}
