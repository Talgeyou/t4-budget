'use client';

import { CgUser } from 'react-icons/cg';
import { UserAvatar, UserAvatarSkeleton, useFetchMe } from '~/entities/user';

export function SidebarUser() {
  const { data: userData, status: userStatus } = useFetchMe();

  const avatar = userData ? (
    <UserAvatar
      user={userData}
      size="lg"
    />
  ) : (
    <CgUser size="4rem" />
  );

  return (
    <div className="grid w-full place-items-center p-4">
      {userStatus === 'loading' ? <UserAvatarSkeleton size="lg" /> : avatar}
    </div>
  );
}
