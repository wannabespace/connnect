import type { Context as HonoContext } from 'hono'

export async function createContext(c: HonoContext) {
  const cookie = c.req.header('Cookie')
  const authorization = c.req.header('Authorization')

  const h = new Headers()

  if (cookie)
    h.set('cookie', cookie)
  if (authorization)
    h.set('authorization', authorization)

  return {
    headers: h,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
