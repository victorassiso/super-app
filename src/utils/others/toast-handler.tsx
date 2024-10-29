'use client'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { getToastDataCookie } from './cookie-handlers'

export function ToastHandler() {
  useEffect(() => {
    const handleToast = async () => {
      const toastData = await getToastDataCookie()
      if (toastData) {
        const { type, message } = toastData
        toast[type](message)
      }
    }
    handleToast()
  }, [])
  return null
}
