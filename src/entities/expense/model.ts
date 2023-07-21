import { useQuery } from '@tanstack/react-query';
import { fetchExpenses } from './api';

export const FETCH_EXPENSES_QUERY_KEY = 'expenses';

export function useFetchExpenses() {
  const query = useQuery({
    queryKey: [FETCH_EXPENSES_QUERY_KEY],
    queryFn: (ctx) => fetchExpenses({ signal: ctx.signal }),
  });

  return query;
}
