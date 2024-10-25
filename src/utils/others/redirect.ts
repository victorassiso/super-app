import { redirect as nextRedirect } from 'next/navigation'

export async function redirect(path: string) {
  nextRedirect(path)
}
