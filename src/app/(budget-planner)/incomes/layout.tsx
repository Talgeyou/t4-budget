import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Incomes | T4 Budget',
  description: 'Your incomes',
};

export default function ExpensesLayout(props: Props) {
  const { children } = props;

  return (
    <div className="p-4 flex flex-col gap-8">
      <h1 className="text-4xl">Incomes</h1>
      {children}
    </div>
  );
}
