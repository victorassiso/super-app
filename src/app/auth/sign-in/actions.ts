'use server'

import { cookies } from 'next/headers'
import { z } from 'zod'

import { signIn } from '@/http/auth/sign-in'
import { isApiError } from '@/lib/api'
import {
  genericErrorMessage,
  isGrantError,
} from '@/utils/others/error-handlers'

const signInSchema = z.object({
  username: z.string().min(1, { message: 'Campo obrigatório.' }),
  password: z.string().min(1, { message: 'Campo obrigatório.' }),
})

export async function signInAction(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { username, password } = result.data

  try {
    const { access_token: accessToken, expires_in: expiresIn } = await signIn({
      username,
      password,
    })

    console.log('DEBUG 1')

    const cookieStore = await cookies()

    cookieStore.set('token', accessToken, {
      path: '/',
      maxAge: expiresIn,
    })
  } catch (err) {
    // Log error
    console.log('DEBUG 2')
    if (isApiError(err) && isGrantError(err)) {
      console.log('DEBUG 3')
      const data = err.response?.config.data
        .replace(/(?<=username=).*?(?=&)/, '[REDACTED]')
        .replace(/(?<=password=).*/, '[REDACTED]')

      const copy = {
        ...err,
        response: {
          ...err.response,
          config: {
            ...err.response?.config,
            data,
          },
        },
      }

      console.error(copy)
    } else {
      console.log('DEBUG 4')
      console.error(err)
    }

    console.log('DEBUG 5')
    const errorMessage = isGrantError(err)
      ? 'Credenciais inválidas'
      : genericErrorMessage

    console.log('DEBUG 6')
    return {
      success: false,
      message: errorMessage,
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
