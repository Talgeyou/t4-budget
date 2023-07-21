import { FreeMoneyCardSkeleton } from '~/features/free-money-card';
import { TotalCardSkeleton } from '~/features/total-card';

export default function DashboardLoader() {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8">
      <TotalCardSkeleton />
      <TotalCardSkeleton />
      <FreeMoneyCardSkeleton />
    </div>
  );
}
