import { redirect } from 'next/navigation';
import { getAuthSession } from '~/shared/auth';

export default async function HomePage() {
  const session = await getAuthSession();

  return redirect(session?.user?.name ? '/dashboard' : '/auth');
}
