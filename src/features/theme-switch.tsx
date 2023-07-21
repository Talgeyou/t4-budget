'use client';

import { useCallback } from 'react';
import { useTheme } from 'next-themes';
import { useIsMounted } from '~/shared/lib/use-is-mounted';
import { Label } from '~/shared/ui/label';
import { Switch } from '~/shared/ui/switch';
import { Skeleton } from '~/shared/ui/skeleton';

export function ThemeSwitch() {
  const mounted = useIsMounted();
  const { theme, setTheme } = useTheme();

  const handleChange = useCallback(
    (checked: boolean) => {
      setTheme(checked ? 'dark' : 'light');
    },
    [setTheme],
  );

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <Skeleton className="w-9 h-5" />
        <Skeleton className="w-20 h-4" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme"
        checked={theme === 'dark'}
        onCheckedChange={handleChange}
      />
      <Label htmlFor="theme">Dark mode</Label>
    </div>
  );
}
