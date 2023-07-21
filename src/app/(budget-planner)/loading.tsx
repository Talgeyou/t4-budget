import { Skeleton } from '~/shared/ui/skeleton';

export default function BudgetPlannerLoader() {
  return (
    <div className="p-4">
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
