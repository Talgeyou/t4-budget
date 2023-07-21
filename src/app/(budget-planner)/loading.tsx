import { Skeleton } from '~/shared/ui/skeleton';

export default function BudgetPlannerLoader() {
  return (
    <div className="p-4">
      <Skeleton className="w-full h-32" />
    </div>
  );
}
