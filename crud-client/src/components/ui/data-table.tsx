import * as React from "react"
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTableFooter } from "./data-table-footer"
import { DataTableToolbar } from "./data-table-toolbar"
import { Checkbox } from "@/components/ui/checkbox"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowSelectionChange?: (selectedRows: number[]) => void
}

export function DataTable<TData extends { id: number }, TValue>({
  columns,
  data,
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")

  const handleRowSelectionChange = React.useCallback((updater: ((old: Record<string, boolean>) => Record<string, boolean>) | Record<string, boolean>) => {
    setRowSelection(updater)
    if (onRowSelectionChange) {
      const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater
      const selectedIds = Object.keys(newSelection).map(
        (index) => data[parseInt(index)].id
      )
      onRowSelectionChange(selectedIds)
    }
  }, [data, onRowSelectionChange, rowSelection])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableRowSelection: true,
    onRowSelectionChange: handleRowSelectionChange,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const value = String(row.getValue(columnId)).toLowerCase()
      return value.includes(String(filterValue).toLowerCase())
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  })

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 min-h-0">
        <DataTableToolbar table={table} />
        <div className="rounded-md border flex-1 overflow-auto">
          <div className="relative">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          table.getIsAllPageRowsSelected() ||
                          (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Összes kijelölése"
                      />
                    </TableHead>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead 
                          key={header.id}
                          className={`
                            ${header.id === "actions" ? "text-right w-[150px] sticky right-0 bg-background shadow-[-8px_0_16px_-6px_rgba(0,0,0,0.1)]" : ""}
                          `}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      <TableCell>
                        <Checkbox
                          checked={row.getIsSelected()}
                          onCheckedChange={(value) => row.toggleSelected(!!value)}
                          aria-label="Sor kijelölése"
                        />
                      </TableCell>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell 
                          key={cell.id}
                          className={`
                            ${cell.column.id === "actions" ? "text-right w-[150px] sticky right-0 bg-background shadow-[-8px_0_16px_-6px_rgba(0,0,0,0.1)]" : ""}
                          `}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      className="h-24 text-center"
                    >
                      Nincs találat.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <DataTableFooter table={table} />
      </div>
    </div>
  )
} 