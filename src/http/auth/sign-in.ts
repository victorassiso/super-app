'use server'

import { env } from '@/env'
import { api } from '@/lib/api'

interface SignInRequest {
  username: string
  password: string
}

export interface SignInResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export async function signIn({
  username,
  password,
}: SignInRequest): Promise<SignInResponse> {
  console.log('DEBUG SIGNIN START')
  const response = await api.post<SignInResponse>(
    `${env.GATEWAY_API_URL}/auth/token`,
    {
      username,
      password,
    } as SignInRequest,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  )
  return response.data
}
