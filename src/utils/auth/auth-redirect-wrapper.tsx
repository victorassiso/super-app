import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const publicPaths = ['/auth']

interface AuthRedirectWrapperProps {
  children: React.ReactNode
  pathname: string
}

export default async function AuthRedirectWrapper({
  children,
  pathname,
}: AuthRedirectWrapperProps) {
  const cookieStore = await cookies()
  const isAuthenticated = !!cookieStore.get('token')

  if (isAuthenticated && publicPaths.includes(pathname)) {
    redirect('/')
  }

  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    redirect('/auth/sign-in')
  }

  return <>{children}</>
}
