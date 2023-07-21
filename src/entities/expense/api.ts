import { Expense, ExpenseTag, TagOnExpense } from '@prisma/client';
import axios from 'axios';

type FetchExpensesParams = {
  signal?: AbortSignal;
};

export async function fetchExpenses(params?: FetchExpensesParams) {
  return axios
    .get<
      (Expense & {
        tags: (TagOnExpense & {
          tag: ExpenseTag;
        })[];
      })[]
    >(`${process.env.NEXT_PUBLIC_URL}/api/expenses`, { signal: params?.signal })
    .then((response) => response.data);
}
