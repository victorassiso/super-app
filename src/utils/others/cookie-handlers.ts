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

export async function getToastDataCookie() {
  const cookieStore = await cookies()

  const toastData = cookieStore.get('toastData')?.value
  if (toastData) {
    const data = JSON.parse(toastData) as {
      type: 'error' | 'warning' | 'success' | 'info'
      message: string
    }
    cookieStore.delete('toastData')
    return data
  }

  return null
}
