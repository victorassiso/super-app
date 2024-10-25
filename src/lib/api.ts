import axios from 'axios'
import { cookies } from 'next/headers'

import { env } from '@/env'

import { queryClient } from './react-query'

export const isApiError = axios.isAxiosError

console.log('API INSTANCE')
console.log({ env })
export const api = axios.create({
  baseURL: env.CIVITAS_API_URL,
})

api.interceptors.request.use(async (config) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    // config.headers['Content-Type'] = 'application/json'
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const cookieStore = await cookies()
      cookieStore.delete('token')
      queryClient.clear()
      window.location.href = '/auth/sign-in'
    }
    return Promise.reject(error)
  },
)
