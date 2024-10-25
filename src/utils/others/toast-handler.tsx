import { useEffect } from 'react'
import { toast } from 'sonner'

import { getToastDataCookie } from './cookie-handlers'

export function useToastHandler() {
  useEffect(() => {
    console.log('ToastHandler 1')
    const handleToast = async () => {
      console.log('Handling toast 1')
      const toastData = await getToastDataCookie()
      if (toastData) {
        const { type, message } = toastData
        toast[type](message)
      }
      console.log('Handling toast 2')
    }
    handleToast()
  }, [])
}
