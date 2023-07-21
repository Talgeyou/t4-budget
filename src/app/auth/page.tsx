import { redirect } from 'next/navigation';
import { AuthForm } from '~/widgets/auth-form';
import { getAuthSession } from '~/shared/auth';

export default async function AuthPage() {
  const session = await getAuthSession();

  if (session?.user?.name) {
    return redirect('/dashboard');
  }

  return (
    <main className="h-screen grid place-items-center">
      <AuthForm />
    </main>
  );
}
