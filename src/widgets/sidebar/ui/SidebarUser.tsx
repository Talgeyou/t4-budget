import { CgUser } from 'react-icons/cg';
import { UserAvatar } from '~/entities/user';
import { getAuthSession } from '~/shared/auth';

export async function SidebarUser() {
  const session = await getAuthSession();

  const avatar = session?.user ? (
    <UserAvatar
      user={session.user}
      size="lg"
    />
  ) : (
    <CgUser size="4rem" />
  );

  return <div className="w-full p-4 grid place-items-center">{avatar}</div>;
}
