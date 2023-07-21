'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '~/shared/lib/utils';

export type SidebarNavigationItem = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactElement;
};

type Props = {
  item: SidebarNavigationItem;
};

export function SidebarNavigationItem(props: Props) {
  const { item } = props;
  const { icon, label, href } = item;

  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        'p-4 hover:bg-accent border-r-2 flex items-center gap-1.5 w-full transition-colors',
        {
          'border-primary bg-accent': pathname.startsWith(item.href),
        },
      )}
    >
      {icon} <span>{label}</span>
    </Link>
  );
}
