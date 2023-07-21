import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Expense } from '@prisma/client';
import { FETCH_EXPENSES_QUERY_KEY } from '~/entities/expense';
import { useToast } from '~/shared/lib/use-toast';

export const DELETE_EXPENSE_MUTATION_KEY = 'expense-delete';

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const showSuccessMessage = useCallback(
    (expense: Expense) => {
      toast({
        title: 'Success!',
        description: `Expense ${expense.title} has been deleted`,
      });
    },
    [toast],
  );

  const mutation = useMutation({
    mutationKey: [DELETE_EXPENSE_MUTATION_KEY],
    mutationFn: (dto: string) =>
      axios
        .delete<Expense>(`/api/expenses/${dto}`)
        .then((response) => response.data),
    onSuccess: (data) => {
      showSuccessMessage(data);
      queryClient.invalidateQueries([FETCH_EXPENSES_QUERY_KEY]);
    },
  });

  return mutation;
}
