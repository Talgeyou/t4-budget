'use client';

import * as React from 'react';

import {
  Column,
  ColumnDef,
  Table as ITable,
  TableOptions,
  flexRender,
  useReactTable,
} from '@tanstack/react-table';
import { CgChevronDown, CgChevronUp } from 'react-icons/cg';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/shared/ui/table';
import { Input } from './input';

interface DataTableProps<TData, TValue> extends TableOptions<TData> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>(
  options: DataTableProps<TData, TValue>,
) {
  const table = useReactTable(options);

  const rows = React.useDeferredValue(table.getRowModel().rows);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const children = header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    );

                const isSortable = header.column.getCanSort();

                const sortDirection = isSortable && header.column.getIsSorted();

                const label = header.column.getCanSort() ? (
                  <button
                    className="flex cursor-pointer items-center gap-1"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {children}

                    {sortDirection &&
                      {
                        asc: <CgChevronUp size="1rem" />,
                        desc: <CgChevronDown size="1rem" />,
                      }[sortDirection]}
                  </button>
                ) : (
                  children
                );

                return (
                  <TableHead key={header.id}>
                    {label}
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter
                          column={header.column}
                          table={table}
                        />
                      </div>
                    ) : null}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows?.length ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={options.columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function Filter<TData, TValue>({
  column,
  table,
}: {
  column: Column<TData, TValue>;
  table: ITable<TData>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column, firstValue],
  );

  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <Input
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className="w-28 rounded border shadow"
        />
        <Input
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(event) =>
            column.setFilterValue((old: [number, number]) => {
              const newValue = [old?.[0], +event.target.value];

              return newValue;
            })
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className="w-28 rounded border shadow"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option
            value={value}
            key={value}
          />
        ))}
      </datalist>
      <Input
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(event) => column.setFilterValue(event.target.value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 rounded border shadow"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  );
}
