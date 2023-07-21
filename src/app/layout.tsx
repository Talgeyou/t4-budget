import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import './globals.css';
import { Toaster } from '~/shared/ui/toaster';
import { cn } from '~/shared/lib/utils';
import { Providers } from './Providers';

const primaryFont = Ubuntu({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'T4 Budget',
  description: 'Best budget planner',
};

type Props = { children: React.ReactNode };

export default function RootLayout(props: Props) {
  const { children } = props;

  return (
    <html lang="en">
      <body
        className={cn(primaryFont.className, 'bg-background text-foreground')}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
