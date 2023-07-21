import { CgMathPlus } from 'react-icons/cg';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { IncomesTotalCard } from '~/widgets/incomes-total-card';
import { IncomesTable } from '~/widgets/incomes-table';
import { IncomeCreateForm } from '~/features/income/create';
import { IncomeTagCreateDialog } from '~/features/income-tag/create';
import { FETCH_INCOMES_QUERY_KEY, fetchIncomes } from '~/entities/income';
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

export default async function Incomes() {
  return (
    <div className="flex flex-col gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-1"
          >
            Create new income <CgMathPlus size="1rem" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create income</DialogTitle>
          </DialogHeader>
          <IncomeTagCreateDialog />
          <IncomeCreateForm />
        </DialogContent>
      </Dialog>
      <IncomesList />
    </div>
  );
}

async function IncomesList() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([FETCH_INCOMES_QUERY_KEY], fetchIncomes);
  await queryClient.prefetchQuery(
    [FETCH_CURRENCIES_QUERY_KEY],
    fetchCurrencies,
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div className="flex flex-col gap-8">
        <IncomesTable />
        <IncomesTotalCard />
      </div>
    </Hydrate>
  );
}
