import { Income, IncomeTag, TagOnIncome } from '@prisma/client';
import axios from 'axios';

type FetchIncomesParams = {
  signal?: AbortSignal;
};

export async function fetchIncomes(params?: FetchIncomesParams) {
  return axios
    .get<(Income & { tags: (TagOnIncome & { tag: IncomeTag })[] })[]>(
      `${process.env.NEXT_PUBLIC_URL}/api/incomes`,
      { signal: params?.signal },
    )
    .then((response) => response.data);
}
