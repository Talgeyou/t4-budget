'use client';

import { useCallback, useId } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IncomeTag } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  IncomeTagCreateFormData,
  incomeTagColors,
  incomeTagCreateFormSchema,
  useCreateIncomeTag,
} from '~/features/income-tag/create/model';
import { Button } from '~/shared/ui/button';
import { Form, FormField, FormItem, FormMessage } from '~/shared/ui/form';
import { Input } from '~/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/shared/ui/select';

type Props = {
  onSubmit: (data: IncomeTag) => void;
};

export function IncomeTagCreateForm(props: Props) {
  const { onSubmit } = props;

  const { mutate: createIncomeTag, status } = useCreateIncomeTag({ onSubmit });

  const formId = useId();

  const form = useForm<IncomeTagCreateFormData>({
    resolver: zodResolver(incomeTagCreateFormSchema),
    defaultValues: {
      color: undefined,
      label: '',
    },
  });

  const handleSubmit: SubmitHandler<IncomeTagCreateFormData> = useCallback(
    (data) => {
      if (status === 'loading') {
        return;
      }

      createIncomeTag(data);
    },
    [createIncomeTag, status],
  );

  return (
    <Form {...form}>
      <form
        id={formId}
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <Input
                placeholder="New tag..."
                disabled={status === 'loading'}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value}
                disabled={status === 'loading'}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Color..." />
                </SelectTrigger>
                <SelectContent>
                  {incomeTagColors.map((color) => (
                    <SelectItem
                      key={color.value}
                      value={color.value}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-4 w-4"
                          style={{ backgroundColor: color.value }}
                        />
                        <span>{color.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          form={formId}
          disabled={status === 'loading'}
        >
          Create
        </Button>
      </form>
    </Form>
  );
}
