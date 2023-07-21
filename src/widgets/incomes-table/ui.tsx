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
import { useDeleteIncome } from '~/features/income/delete';
import { useFetchIncomes } from '~/entities/income';
import { useFetchCurrenciesData } from '~/entities/currency';
import { DataTable } from '~/shared/ui/data-table';
import { cn } from '~/shared/lib/utils';
import { Skeleton } from '~/shared/ui/skeleton';
import { getIncomesColumns } from './columns';

export function IncomesTableSkeleton() {
  return <Skeleton className="h-24 w-full" />;
}

export function IncomesTable() {
  const { data: currenciesData, status: currenciesStatus } =
    useFetchCurrenciesData();

  const { data: incomesData, status: incomesStatus } = useFetchIncomes();

  const { mutate: deleteIncome, status: deleteIncomeStatus } =
    useDeleteIncome();

  const isLoading = deleteIncomeStatus === 'loading';

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  return (
    <div
      className={cn({
        'opacity-50 pointer-events-none': isLoading,
      })}
    >
      {incomesStatus === 'loading' || currenciesStatus === 'loading' ? (
        <IncomesTableSkeleton />
      ) : (
        <DataTable
          columns={getIncomesColumns({
            currenciesData,
            onDelete: deleteIncome,
          })}
          debugTable
          state={{ sorting, columnFilters }}
          data={incomesData ?? []}
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
