import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Expense } from '@prisma/client';
import { FETCH_EXPENSES_QUERY_KEY } from '~/entities/expense';
import { useToast } from '~/shared/lib/use-toast';
import { ExpenseUpdateDto } from './schema';

export const UPDATE_EXPENSE_MUTATION_KEY = 'expense-update';

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const showSuccessMessage = useCallback(
    (expense: Expense) => {
      toast({
        title: 'Success!',
        description: `Expense ${expense.title} has been updated`,
      });
    },
    [toast],
  );

  const mutation = useMutation({
    mutationKey: [UPDATE_EXPENSE_MUTATION_KEY],
    mutationFn: ({
      expenseId,
      dto,
    }: {
      expenseId: string;
      dto: ExpenseUpdateDto;
    }) =>
      axios
        .put<Expense>(`/api/expenses/${expenseId}`, dto)
        .then((response) => response.data),
    onSuccess: (data) => {
      showSuccessMessage(data);
      queryClient.invalidateQueries([FETCH_EXPENSES_QUERY_KEY]);
    },
  });

  return mutation;
}
