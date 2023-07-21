'use client';

import { CgTrending } from 'react-icons/cg';
import { TotalCard, TotalCardSkeleton } from '~/features/total-card';
import { useFetchExpenses } from '~/entities/expense';

export function ExpensesTotalCard() {
  const { data: expensesData, status: expensesStatus } = useFetchExpenses();

  return expensesStatus === 'loading' ? (
    <TotalCardSkeleton />
  ) : (
    <TotalCard
      icon={<CgTrending size="1.5rem" />}
      items={expensesData ?? []}
      title="Total expenses"
    />
  );
}
