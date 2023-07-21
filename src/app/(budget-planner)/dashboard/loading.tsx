import { FreeMoneyCardSkeleton } from '~/features/free-money-card';
import { TotalCardSkeleton } from '~/features/total-card';

export default function DashboardLoader() {
  return (
    <div className="grid grid-cols-1 gap-8 2xl:grid-cols-3">
      <TotalCardSkeleton />
      <TotalCardSkeleton />
      <FreeMoneyCardSkeleton />
    </div>
  );
}
