import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AuthForm } from '~/widgets/auth-form';
import { getAuthSession } from '~/shared/auth';

export const metadata: Metadata = {
  title: 'Auth | T4 Budget',
  description: 'You should sign in to use the t4 budget app',
};

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
