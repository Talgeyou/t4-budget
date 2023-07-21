import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Expense } from '@prisma/client';
import { FETCH_EXPENSES_QUERY_KEY } from '~/entities/expense';
import { useToast } from '~/shared/lib/use-toast';
import { CreateExpenseDto } from './schema';

export const CREATE_EXPENSE_MUTATION_KEY = 'expense-create';

type CreateExpenseHookParams = {
  onSuccess?: (expense: Expense) => void;
};

export function useCreateExpense(params?: CreateExpenseHookParams) {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const showSuccessMessage = useCallback(
    (expense: Expense) => {
      toast({
        title: 'Success!',
        description: `Expense ${expense.title} has been created`,
      });
    },
    [toast],
  );

  const mutation = useMutation({
    mutationKey: [CREATE_EXPENSE_MUTATION_KEY],
    mutationFn: (dto: CreateExpenseDto) =>
      axios
        .post<Expense>('/api/expenses', dto)
        .then((response) => response.data),
    onSuccess: (data) => {
      showSuccessMessage(data);
      queryClient.invalidateQueries([FETCH_EXPENSES_QUERY_KEY]);

      if (params?.onSuccess) {
        params.onSuccess(data);
      }
    },
  });

  return mutation;
}
