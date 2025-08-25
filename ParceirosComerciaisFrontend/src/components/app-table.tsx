import * as React from "react"
import { cn } from "@/libs/utils"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

export type TableAlignment = "left" | "center" | "right"

export interface ColumnDef<TData> {
  id?: string
  header: React.ReactNode
  accessor?: keyof TData | ((row: TData) => unknown)
  format?: (value: unknown, row: TData, rowIndex: number) => React.ReactNode
  cell?: (ctx: {
    row: TData
    value: unknown
    rowIndex: number
    colIndex: number
  }) => React.ReactNode
  className?: string
  headerClassName?: string
  align?: TableAlignment
}

export interface AppTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  caption?: React.ReactNode
  getRowKey?: (row: TData, index: number) => string | number
  rowClassName?: string | ((row: TData, index: number) => string)
  onRowClick?: (row: TData, index: number) => void
  tableClassName?: string
  containerClassName?: string
  headerRowClassName?: string
  renderEmptyState?: React.ReactNode
  loading?: boolean
}

function getAlignmentClass(align?: TableAlignment) {
  if (align === "center") return "text-center"
  if (align === "right") return "text-right"
  return "text-left"
}

function resolveValue<TData>(row: TData, accessor?: keyof TData | ((r: TData) => unknown)) {
  if (!accessor) return undefined
  if (typeof accessor === "function") return accessor(row)
  return row[accessor]
}

export function AppTableSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-32 h-8 bg-slate-100 rounded-lg" />
        <div className="w-32 h-8 bg-slate-100 rounded-lg" />
        <div className="w-32 h-8 bg-slate-100 rounded-lg" />
        <div className="w-32 h-8 bg-slate-100 rounded-lg" />
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        <div className='w-full h-12 bg-slate-100' />
        <div className='w-full h-12 bg-slate-100' />
        <div className='w-full h-12 bg-slate-100' />
      </div>
    </div>
  )
}

export function AppTable<TData>(props: AppTableProps<TData>) {
  const {
    columns,
    data,
    caption,
    getRowKey,
    rowClassName,
    onRowClick,
    tableClassName,
    containerClassName,
    headerRowClassName,
    renderEmptyState, 
    loading = false
  } = props

  if (loading) return <AppTableSkeleton />;

  return (
    <div className={cn("max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-240px-2rem)] overflow-hidden", containerClassName)}>
      {data.length === 0 ? renderEmptyState ?? "Nenhum registro encontrado" : (

        <Table className={cn("w-full overflow-x-auto", tableClassName)}>
          {caption ? <TableCaption>{caption}</TableCaption> : null}
          <TableHeader className="bg-gray-50 border-b border-gray-200">
            <TableRow
              className={cn("hover:bg-transparent", headerRowClassName)}
            >
              {columns.map((col, colIndex) => (
                <TableHead
                  key={col.id ?? colIndex}
                  className={cn("bg-transparent px-5 py-2 font-medium !text-slate-500 text-left text-theme-xs", getAlignmentClass(col.align), col.headerClassName)} 
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => {
              const computedRowClassName =
                typeof rowClassName === "function" ? rowClassName(row, rowIndex) : rowClassName
                
              const rowKey = getRowKey?.(row, rowIndex) ?? rowIndex

              return (
                <TableRow
                  key={rowKey}
                  {...(onRowClick
                    ? {
                        onClick: () => onRowClick(row, rowIndex),
                        className: cn("cursor-pointer", computedRowClassName),
                      }
                    : {
                        className: computedRowClassName
                    })}
                >
                  {columns.map((col, colIndex) => {
                    const rawValue = resolveValue(row as TData, col.accessor)
                    const content =
                      col.cell?.({ row, value: rawValue, rowIndex, colIndex }) ??
                      col.format?.(rawValue, row, rowIndex) ??
                      (rawValue as React.ReactNode)

                    return (
                      <TableCell
                        key={(col.id ?? colIndex) as React.Key}
                        className={cn(
                          getAlignmentClass(col.align),
                          col.className, 
                          "px-5"
                        )}
                      >
                        {content}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export type { AppTableProps as AppTablePropsGeneric }