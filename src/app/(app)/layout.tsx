import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const isAuthenticated = !!cookieStore.get('token')

  if (!isAuthenticated) redirect('/auth/sign-in')

  return <div className="h-full">{children}</div>
}
