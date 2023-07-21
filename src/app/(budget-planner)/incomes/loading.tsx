import { IncomesTableSkeleton } from '~/widgets/incomes-table';
import { TotalCardSkeleton } from '~/features/total-card';
import { Skeleton } from '~/shared/ui/skeleton';

export default function IncomesLoader() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-9 w-full" />
      <div className="flex flex-col gap-8">
        <IncomesTableSkeleton />
        <TotalCardSkeleton />
      </div>
    </div>
  );
}
