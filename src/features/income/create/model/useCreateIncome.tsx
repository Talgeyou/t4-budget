import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Income } from '@prisma/client';
import { FETCH_INCOMES_QUERY_KEY } from '~/entities/income';
import { useToast } from '~/shared/lib/use-toast';
import { CreateIncomeDto } from './schema';

export const CREATE_INCOME_MUTATION_KEY = 'income-create';

type CreateIncomeHookParams = {
  onSuccess?: (income: Income) => void;
};

export function useCreateIncome(params?: CreateIncomeHookParams) {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const showSuccessMessage = useCallback(
    (income: Income) => {
      toast({
        title: 'Success!',
        description: `Income ${income.title} has been created`,
      });
    },
    [toast],
  );

  const mutation = useMutation({
    mutationKey: [CREATE_INCOME_MUTATION_KEY],
    mutationFn: (dto: CreateIncomeDto) =>
      axios.post<Income>('/api/incomes', dto).then((response) => response.data),
    onSuccess: (data) => {
      showSuccessMessage(data);
      queryClient.invalidateQueries([FETCH_INCOMES_QUERY_KEY]);

      if (params?.onSuccess) {
        params.onSuccess(data);
      }
    },
  });

  return mutation;
}
