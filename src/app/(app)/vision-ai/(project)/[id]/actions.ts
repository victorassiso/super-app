'use server'

import { cookies } from 'next/headers'

interface setToastDataCookieProps {
  type: 'error' | 'warning' | 'success' | 'info'
  message: string
}

export async function setToastDataCookie({
  message,
  type,
}: setToastDataCookieProps) {
  const cookieStore = await cookies()
  const toastData = {
    type,
    message,
  }
  cookieStore.set('toastData', JSON.stringify(toastData), { path: '/' })
}
