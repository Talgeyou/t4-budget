import { useQuery } from '@tanstack/react-query';
import { fetchMe } from './api';

export const FETCH_ME_QUERY_KEY = 'users-me';

export function useFetchMe() {
  const query = useQuery({
    queryKey: [FETCH_ME_QUERY_KEY],
    queryFn: (ctx) => fetchMe({ signal: ctx.signal }),
  });

  return query;
}
