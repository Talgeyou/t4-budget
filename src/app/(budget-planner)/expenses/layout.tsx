import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expenses | T4 Budget',
  description: 'Your expenses',
};

type Props = {
  children: React.ReactNode;
};

export default function ExpensesLayout(props: Props) {
  const { children } = props;

  return (
    <div className="p-4 flex flex-col gap-8">
      <h1 className="text-4xl">Expenses</h1>
      {children}
    </div>
  );
}
