import { ExpensesTotalCard } from '~/widgets/expenses-total-card';
import { IncomesTotalCard } from '~/widgets/incomes-total-card';
import { FreeMoneyCard } from '~/features/free-money-card';
import { FETCH_INCOMES_QUERY_KEY, fetchIncomes } from '~/entities/income';
import { FETCH_EXPENSES_QUERY_KEY, fetchExpenses } from '~/entities/expense';
import { FETCH_CURRENCIES_QUERY_KEY } from '~/entities/currency';
import getQueryClient from '~/shared/lib/get-query-client';
import { fetchCurrencies } from '~/shared/api/fetch-currencies';

export default async function DashboardPage() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery([FETCH_INCOMES_QUERY_KEY], fetchIncomes);
  queryClient.prefetchQuery([FETCH_EXPENSES_QUERY_KEY], fetchExpenses);
  queryClient.prefetchQuery([FETCH_CURRENCIES_QUERY_KEY], fetchCurrencies);

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8">
      <IncomesTotalCard />
      <ExpensesTotalCard />
      <FreeMoneyCard />
    </div>
  );
}
