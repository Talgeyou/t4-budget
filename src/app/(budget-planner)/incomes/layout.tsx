type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function ExpensesLayout(props: Props) {
  const { children, modal } = props;

  return (
    <div className="p-4 flex flex-col gap-8">
      <h1 className="text-4xl">Incomes</h1>
      {children}
      {modal}
    </div>
  );
}
