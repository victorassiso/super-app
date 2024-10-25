import AuthRedirectWrapper from '@/utils/auth/auth-redirect-wrapper'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthRedirectWrapper pathname="/">
      <div className="h-full">{children}</div>
    </AuthRedirectWrapper>
  )
}
