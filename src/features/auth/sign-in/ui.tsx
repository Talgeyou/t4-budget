'use client';

import { useCallback, useMemo, useState } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { signIn } from 'next-auth/react';
import { Button } from '~/shared/ui/button';

const ICON_SIZE = 16;

export function SignInButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(() => {
    if (loading) return;

    setLoading(true);
    void signIn('discord').finally(() => setLoading(false));
  }, [loading]);

  const icon = useMemo(() => {
    if (loading) {
      return (
        <CgSpinner
          size={ICON_SIZE}
          className="animate-spin"
        />
      );
    }

    return <FaDiscord size={ICON_SIZE} />;
  }, [loading]);

  return (
    <Button
      className="flex items-center gap-2 w-full"
      disabled={loading}
      onClick={handleClick}
    >
      {icon} <span>Sign in</span>
    </Button>
  );
}
