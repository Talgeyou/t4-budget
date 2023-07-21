import { ExpenseTag } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const FETCH_EXPENSE_TAGS_QUERY_KEY = 'expense-tags';

export function useFetchExpenseTags() {
  const query = useQuery({
    queryKey: [FETCH_EXPENSE_TAGS_QUERY_KEY],
    queryFn: (ctx) =>
      axios
        .get<ExpenseTag[]>('/api/expense-tags', { signal: ctx.signal })
        .then((response) => response.data),
  });

  return query;
}
