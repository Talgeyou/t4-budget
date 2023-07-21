import { IncomeTag } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FETCH_INCOME_TAGS_QUERY_KEY } from '~/entities/income-tag';
import { useToast } from '~/shared/lib/use-toast';
import { IncomeTagCreateDto } from './schema';

export const CREATE_INCOME_TAG_MUTATION_KEY = 'income-tag-create';

type CreateIncomeTagHookParams = {
  onSubmit?: (incomeTag: IncomeTag) => void;
};

export function useCreateIncomeTag(params?: CreateIncomeTagHookParams) {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation({
    mutationKey: [CREATE_INCOME_TAG_MUTATION_KEY],
    mutationFn: (dto: IncomeTagCreateDto) =>
      axios
        .post<IncomeTag>('/api/income-tags', dto)
        .then((response) => response.data),
    onSuccess: (data) => {
      toast({
        title: 'Success!',
        description: `Income tag ${data.label} has been created successfully`,
      });
      queryClient.invalidateQueries([FETCH_INCOME_TAGS_QUERY_KEY]);

      if (params?.onSubmit) {
        params.onSubmit(data);
      }
    },
  });

  return mutation;
}
