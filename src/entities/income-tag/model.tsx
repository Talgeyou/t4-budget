import { IncomeTag } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const FETCH_INCOME_TAGS_QUERY_KEY = 'expense-tags';

export function useFetchIncomeTags() {
  const query = useQuery({
    queryKey: [FETCH_INCOME_TAGS_QUERY_KEY],
    queryFn: (ctx) =>
      axios
        .get<IncomeTag[]>('/api/income-tags', { signal: ctx.signal })
        .then((response) => response.data),
  });

  return query;
}
