import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | T4 Budget',
};

type Props = {
  children: React.ReactNode;
};

export default function ExpensesLayout(props: Props) {
  const { children } = props;

  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-4xl">Dashboard</h1>
      {children}
    </div>
  );
}
