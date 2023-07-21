'use client';

import { useCallback, useState } from 'react';
import {
  CgChevronDoubleLeft,
  CgChevronDoubleRight,
  CgClose,
  CgTemplate,
  CgTrending,
  CgTrendingDown,
} from 'react-icons/cg';
import { SignOutButton } from '~/features/auth/sign-out/ui';
import { ThemeSwitch } from '~/features/theme-switch';
import { Separator } from '~/shared/ui/separator';
import { cn } from '~/shared/lib/utils';
import { Button } from '~/shared/ui/button';
import { SidebarNavigationItem } from './SidebarNavigationItem';
import { SidebarUser } from './SidebarUser';

const sidebarItems: SidebarNavigationItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: <CgTemplate size="1.5rem" />,
  },
  {
    key: 'incomes',
    label: 'Incomes',
    href: '/incomes',
    icon: <CgTrending size="1.5rem" />,
  },
  {
    key: 'expenses',
    label: 'Expenses',
    href: '/expenses',
    icon: <CgTrendingDown size="1.5rem" />,
  },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  const collapse = useCallback(() => {
    setExpanded(false);
  }, []);

  const handleToggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <aside className="relative">
      <Button
        className="absolute right-0 top-12 h-fit w-fit translate-x-full lg:hidden"
        onClick={handleToggle}
      >
        {expanded ? (
          <CgChevronDoubleLeft size="2rem" />
        ) : (
          <CgChevronDoubleRight size="2rem" />
        )}
      </Button>
      <div
        className={cn(
          'w-full overflow-hidden -translate-x-full lg:translate-x-0 fixed lg:relative z-50 lg:w-[200px] lg:min-w-[200px] lg:max-w-[200px] drop-shadow-lg bg-background border-r border-r-accent transition-transform',
          {
            'translate-x-0': expanded,
          },
        )}
      >
        <div className="flex justify-end p-4 lg:hidden">
          <Button
            variant="ghost"
            className="h-fit w-fit"
            onClick={collapse}
          >
            <CgClose size="2rem" />
          </Button>
        </div>
        <SidebarUser />

        <Separator />

        <nav className="py-4">
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.key}>
                <SidebarNavigationItem item={item} />
              </li>
            ))}
          </ul>
        </nav>

        <Separator />

        <div className="p-4">
          <ThemeSwitch />
        </div>

        <Separator />

        <div className="p-4">
          <SignOutButton />
        </div>
      </div>
    </aside>
  );
}
