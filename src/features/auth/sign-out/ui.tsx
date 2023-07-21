'use client';

import { useCallback, useMemo, useState } from 'react';
import { signOut } from 'next-auth/react';
import { CgLogOut, CgSpinner } from 'react-icons/cg';
import { Button } from '~/shared/ui/button';

export function SignOutButton() {
  const [loading, setLoading] = useState(false);

  const icon = useMemo(() => {
    if (loading) {
      return (
        <CgSpinner
          size="1.5rem"
          className="animate-spin"
        />
      );
    }

    return <CgLogOut size="1.5rem" />;
  }, [loading]);

  const handleClick = useCallback(() => {
    if (loading) {
      return;
    }

    setLoading(true);
    void signOut().finally(() => setLoading(false));
  }, [loading]);

  return (
    <Button
      className="flex w-full items-center gap-2"
      variant="destructive"
      disabled={loading}
      onClick={handleClick}
    >
      {icon} <span>Sign out</span>
    </Button>
  );
}
