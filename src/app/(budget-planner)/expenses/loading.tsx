import { ExpensesTableSkeleton } from '~/widgets/expenses-table';
import { TotalCardSkeleton } from '~/features/total-card';
import { Skeleton } from '~/shared/ui/skeleton';

export default function ExpensesLoader() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-9 w-full" />
      <div className="flex flex-col gap-8">
        <ExpensesTableSkeleton />
        <TotalCardSkeleton />
      </div>
    </div>
  );
}
