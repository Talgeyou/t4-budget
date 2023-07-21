'use client';

import { useState } from 'react';
import {
  ColumnFilter,
  SortingState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useDeleteExpense } from '~/features/expense/delete/model';
import { useFetchExpenses } from '~/entities/expense';
import { useFetchCurrenciesData } from '~/entities/currency';
import { DataTable } from '~/shared/ui/data-table';
import { cn } from '~/shared/lib/utils';
import { Skeleton } from '~/shared/ui/skeleton';
import { getExpensesColumns } from './columns';

export function ExpensesTableSkeleton() {
  return <Skeleton className="h-24 w-full" />;
}

export function ExpensesTable() {
  const { data: currenciesData, status: currenciesStatus } =
    useFetchCurrenciesData();
  const { data: expensesData, status: expensesStatus } = useFetchExpenses();

  const { mutate: deleteExpense, status: deleteExpenseStatus } =
    useDeleteExpense();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  return (
    <div
      className={cn({
        'opacity-50 pointer-events-none': deleteExpenseStatus === 'loading',
      })}
    >
      {expensesStatus === 'loading' || currenciesStatus === 'loading' ? (
        <ExpensesTableSkeleton />
      ) : (
        <DataTable
          columns={getExpensesColumns({
            currenciesData,
            onDelete: deleteExpense,
          })}
          state={{ sorting, columnFilters }}
          data={expensesData ?? []}
          onSortingChange={setSorting}
          onColumnFiltersChange={setColumnFilters}
          getCoreRowModel={getCoreRowModel()}
          getSortedRowModel={getSortedRowModel()}
          getFilteredRowModel={getFilteredRowModel()}
          getFacetedUniqueValues={getFacetedUniqueValues()}
          getFacetedMinMaxValues={getFacetedMinMaxValues()}
        />
      )}
    </div>
  );
}
