import { Toaster } from '@connnect/ui/components/sonner'
import appCss from '@connnect/ui/globals.css?url'
import { ThemeProvider } from '@connnect/ui/theme-provider'
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'Connnect.app - AI-powered connections management tool',
        description: 'AI-powered connections management tool that makes database operations smarter. A modern alternative to pgAdmin, DBeaver, etc.',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      // {
      //   rel: 'apple-touch-icon',
      //   sizes: '180x180',
      //   href: '/apple-touch-icon.png',
      // },
      // {
      //   rel: 'icon',
      //   type: 'image/png',
      //   sizes: '32x32',
      //   href: '/favicon-32x32.png',
      // },
      // {
      //   rel: 'icon',
      //   type: 'image/png',
      //   sizes: '16x16',
      //   href: '/favicon-16x16.png',
      // },
      // { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
        <Toaster />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
