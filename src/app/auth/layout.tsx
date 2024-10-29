'use server'

import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const isAuthenticated = !!cookieStore.get('token')

  if (isAuthenticated) redirect('/')
  return (
    <div className="min-h-screen px-4 pt-4">
      <div className="-mt-10 flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4">
        {children}
      </div>
      <span className="mb-4 block w-full text-center text-xs text-muted-foreground">
        Copyright ©{' '}
        <Link href="https://www.dados.rio/" className="underline">
          Escritório de Dados do Rio de Janeiro
        </Link>{' '}
        2024.
      </span>
    </div>
  )
}
