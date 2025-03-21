import { Avatar, AvatarFallback, AvatarImage } from '@connnect/ui/components/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@connnect/ui/components/dropdown-menu'
import { RiLogoutCircleRLine } from '@remixicon/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSession } from '~/hooks/use-session'
import { fullSignOut } from '~/lib/auth'
import { clearIndexedDb } from '~/lib/indexeddb'
import { queryClient } from '~/main'

export function UserButton() {
  const { refetch, data } = useSession()

  const { mutate: signOut, isPending: isSigningOut } = useMutation({
    mutationFn: async () => {
      await fullSignOut()
      await refetch()
    },
    onSuccess: () => {
      toast.success('You have been signed out successfully.')

      // Timeout to wait transition to auth page
      setTimeout(() => {
        clearIndexedDb()
        queryClient.invalidateQueries()
      }, 1000)
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-md">
        <Avatar className="size-6">
          {data?.user.image && <AvatarImage src={data?.user.image} />}
          <AvatarFallback className="text-xs">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-70">
        <div className="flex items-center gap-2 h-10 px-2 mt-1 mb-2">
          <Avatar className="size-6">
            {data?.user.image && <AvatarImage src={data?.user.image} />}
            <AvatarFallback className="text-xs">{data?.user.name ? `${data.user.name.charAt(0)}${data.user.name.charAt(1)}` : data?.user.email.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-0">
            <span className="text-sm font-medium">
              {data?.user.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {data?.user.email}
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isSigningOut}
          onClick={() => signOut()}
        >
          <RiLogoutCircleRLine />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
