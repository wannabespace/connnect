import { Separator } from '@connnect/ui/components/separator'
import { useStore } from '@tanstack/react-store'
import { useDatabase, useDatabaseTableTotal } from '~/entities/database'
import { Route, usePageContext } from '..'
import { useColumnsQuery } from '../-queries/use-columns-query'
import { HeaderActions } from './header-actions'
import { HeaderSearch } from './header-search'

export function Header() {
  const { id, table, schema } = Route.useParams()
  const { data: database } = useDatabase(id)
  const { data: columns } = useColumnsQuery()
  const { store } = usePageContext()
  const filters = useStore(store, state => state.filters)
  const { data: total } = useDatabaseTableTotal(database, table, schema, {
    filters,
  })

  const columnsCount = columns?.length ?? 0

  return (
    <div className="flex gap-6 w-full items-center justify-between">
      <div className="flex flex-1 gap-4 items-center">
        <div className="shrink-0">
          <h2 className="font-medium text-sm mb-0.5 space-x-1">
            <span className="text-muted-foreground">
              {schema}
            </span>
            {' '}
            <span className="text-muted-foreground/20">/</span>
            {' '}
            <span data-mask>{table}</span>
          </h2>
          <p className="text-muted-foreground text-xs">
            {columnsCount}
            {' '}
            column
            {columnsCount === 1 ? '' : 's'}
            {' '}
            •
            {' '}
            {total ?? <span className="animate-pulse">...</span>}
            {' '}
            row
            {total !== undefined && total !== 1 && 's'}
          </p>
        </div>
        <Separator orientation="vertical" className="h-6!" />
        <HeaderSearch />
      </div>
      <HeaderActions />
    </div>
  )
}
