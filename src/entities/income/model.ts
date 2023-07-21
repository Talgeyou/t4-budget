import { useQuery } from '@tanstack/react-query';
import { fetchIncomes } from './api';

export const FETCH_INCOMES_QUERY_KEY = 'incomes';

export function useFetchIncomes() {
  const query = useQuery({
    queryKey: [FETCH_INCOMES_QUERY_KEY],
    queryFn: (ctx) => fetchIncomes({ signal: ctx.signal }),
  });

  return query;
}
