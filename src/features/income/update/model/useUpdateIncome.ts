import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Income } from '@prisma/client';
import { FETCH_INCOMES_QUERY_KEY } from '~/entities/income';
import { useToast } from '~/shared/lib/use-toast';
import { IncomeUpdateDto } from './schema';

export const UPDATE_INCOME_MUTATION_KEY = 'income-update';

export function useUpdateIncome() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const showSuccessMessage = useCallback(
    (income: Income) => {
      toast({
        title: 'Success!',
        description: `Income ${income.title} has been updated`,
      });
    },
    [toast],
  );

  const mutation = useMutation({
    mutationKey: [UPDATE_INCOME_MUTATION_KEY],
    mutationFn: ({
      incomeId,
      dto,
    }: {
      incomeId: string;
      dto: IncomeUpdateDto;
    }) =>
      axios
        .put<Income>(`/api/incomes/${incomeId}`, dto)
        .then((response) => response.data),
    onSuccess: (data) => {
      showSuccessMessage(data);
      queryClient.invalidateQueries([FETCH_INCOMES_QUERY_KEY]);
    },
  });

  return mutation;
}
