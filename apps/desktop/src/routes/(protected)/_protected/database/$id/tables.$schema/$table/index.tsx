import type { WhereFilter } from '~/entities/database'
import type { PageSize } from '~/entities/database/table'
import { SQL_OPERATORS_LIST } from '@connnect/shared/utils/sql'
import { title } from '@connnect/shared/utils/title'
import { createFileRoute } from '@tanstack/react-router'
import { Store } from '@tanstack/react-store'
import { createContext, use, useState } from 'react'
import { ensureDatabaseTableCore } from '~/entities/database'
import { FiltersProvider } from '~/entities/database/table'
import { Filters } from './-components/filters'
import { Footer } from './-components/footer'
import { Header } from './-components/header'
import { Table } from './-components/table'
import { useColumnsQuery } from './-queries/use-columns-query'

interface TableStore {
  page: number
  pageSize: PageSize
  selected: number[]
  filters: WhereFilter[]
  orderBy?: [string, 'ASC' | 'DESC']
}

const TableStoreContext = createContext<Store<TableStore>>(null!)

export function useTableStoreContext() {
  return use(TableStoreContext)
}

export const Route = createFileRoute(
  '/(protected)/_protected/database/$id/tables/$schema/$table/',
)({
  component: DatabaseTablePage,
  beforeLoad: async ({ context, params }) => {
    await ensureDatabaseTableCore(context.database, params.schema, params.table)
  },
  loader: ({ context }) => ({ database: context.database }),
  head: ({ loaderData, params }) => ({
    meta: loaderData
      ? [
          {
            title: title(`${params.schema}.${params.table}`, loaderData.database.name),
          },
        ]
      : [],
  }),
})

function DatabaseTablePage() {
  const [store] = useState(() => new Store<TableStore>({
    page: 1,
    pageSize: 50,
    selected: [],
    filters: [],
  }))
  const { data: columns } = useColumnsQuery()

  return (
    <TableStoreContext value={store}>
      <FiltersProvider
        columns={columns}
        operators={SQL_OPERATORS_LIST}
      >
        <div className="h-screen flex flex-col justify-between">
          <div className="flex flex-col gap-4 p-4">
            <Header />
            <Filters />
          </div>
          <div className="flex-1 overflow-hidden">
            <Table />
          </div>
          <Footer />
        </div>
      </FiltersProvider>
    </TableStoreContext>
  )
}
