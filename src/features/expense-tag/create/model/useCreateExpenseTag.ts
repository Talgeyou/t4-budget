import { ExpenseTag } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FETCH_EXPENSE_TAGS_QUERY_KEY } from '~/entities/expense-tag';
import { useToast } from '~/shared/lib/use-toast';
import { ExpenseTagCreateDto } from './schema';

export const CREATE_EXPENSE_TAG_MUTATION_KEY = 'expense-tag-create';

type CreateExpenseTagHookParams = {
  onSuccess?: (expenseTag: ExpenseTag) => void;
};

export function useCreateExpenseTag(params?: CreateExpenseTagHookParams) {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation({
    mutationKey: [CREATE_EXPENSE_TAG_MUTATION_KEY],
    mutationFn: (dto: ExpenseTagCreateDto) =>
      axios
        .post<ExpenseTag>('/api/expense-tags', dto)
        .then((response) => response.data),
    onSuccess: (data) => {
      toast({
        title: 'Success!',
        description: `Expense tag ${data.label} has been created successfully`,
      });
      queryClient.invalidateQueries([FETCH_EXPENSE_TAGS_QUERY_KEY]);

      if (params?.onSuccess) {
        params.onSuccess(data);
      }
    },
  });

  return mutation;
}
