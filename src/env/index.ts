import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: z.string().min(1),
})

const _env = envSchema.safeParse({
  NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
})

if (_env.success === false) {
  console.error('❌ Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables!')
}

export const env = _env.data
