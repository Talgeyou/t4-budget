import { redirect } from 'next/navigation';
import { Sidebar } from '~/widgets/sidebar/ui/Sidebar';
import { getAuthSession } from '~/shared/auth';

type Props = {
  children: React.ReactNode;
};

export default async function BudgetPlannerLayout(props: Props) {
  const { children } = props;

  const session = await getAuthSession();

  if (!session?.user?.name) {
    return redirect('/auth');
  }

  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="w-full overflow-y-auto">{children}</main>
    </div>
  );
}
