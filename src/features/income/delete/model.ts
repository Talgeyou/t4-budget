import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Income } from '@prisma/client';
import { FETCH_INCOMES_QUERY_KEY } from '~/entities/income';
import { useToast } from '~/shared/lib/use-toast';

export const DELETE_INCOME_MUTATION_KEY = 'income-delete';

export function useDeleteIncome() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const showSuccessMessage = useCallback(
    (income: Income) => {
      toast({
        title: 'Success!',
        description: `Income ${income.title} has been deleted`,
      });
    },
    [toast],
  );

  const mutation = useMutation({
    mutationKey: [DELETE_INCOME_MUTATION_KEY],
    mutationFn: (dto: string) =>
      axios
        .delete<Income>(`/api/incomes/${dto}`)
        .then((response) => response.data),
    onSuccess: (data) => {
      showSuccessMessage(data);
      queryClient.invalidateQueries([FETCH_INCOMES_QUERY_KEY]);
    },
  });

  return mutation;
}
