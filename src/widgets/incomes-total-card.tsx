'use client';

import { CgTrending } from 'react-icons/cg';
import { TotalCard, TotalCardSkeleton } from '~/features/total-card';
import { useFetchIncomes } from '~/entities/income';

export function IncomesTotalCard() {
  const { data: incomesData, status: incomesStatus } = useFetchIncomes();

  return incomesStatus === 'loading' ? (
    <TotalCardSkeleton />
  ) : (
    <TotalCard
      icon={<CgTrending size="1.5rem" />}
      items={incomesData ?? []}
      title="Total income"
    />
  );
}
