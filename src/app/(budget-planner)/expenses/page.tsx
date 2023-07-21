import { Hydrate, dehydrate } from '@tanstack/react-query';
import { CgMathPlus } from 'react-icons/cg';
import { ExpensesTable } from '~/widgets/expenses-table/ui';
import { ExpensesTotalCard } from '~/widgets/expenses-total-card';
import { ExpenseCreateForm } from '~/features/expense/create';
import { ExpenseTagCreateDialog } from '~/features/expense-tag/create';
import { FETCH_EXPENSES_QUERY_KEY, fetchExpenses } from '~/entities/expense';
import { FETCH_CURRENCIES_QUERY_KEY } from '~/entities/currency';
import { Button } from '~/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/shared/ui/dialog';
import getQueryClient from '~/shared/lib/get-query-client';
import { fetchCurrencies } from '~/shared/api/fetch-currencies';

export default async function ExpensesPage() {
  return (
    <div className="flex flex-col gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-1"
          >
            Create new expense <CgMathPlus size="1rem" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create expense</DialogTitle>
          </DialogHeader>
          <ExpenseTagCreateDialog />
          <ExpenseCreateForm />
        </DialogContent>
      </Dialog>
      <ExpensesList />
    </div>
  );
}

async function ExpensesList() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([FETCH_EXPENSES_QUERY_KEY], fetchExpenses);
  await queryClient.prefetchQuery(
    [FETCH_CURRENCIES_QUERY_KEY],
    fetchCurrencies,
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div className="flex flex-col gap-8">
        <ExpensesTable />
        <ExpensesTotalCard />
      </div>
    </Hydrate>
  );
}
