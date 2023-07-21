import { CgTemplate, CgTrending, CgTrendingDown } from 'react-icons/cg';
import { SignOutButton } from '~/features/auth/sign-out/ui';
import { Separator } from '~/shared/ui/separator';
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
  return (
    <aside className="min-w-[200px] max-w-[200px] drop-shadow-lg bg-background">
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
        <SignOutButton />
      </div>
    </aside>
  );
}
