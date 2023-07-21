'use client';

import { useCallback, useId } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ExpenseTag } from '@prisma/client';
import {
  ExpenseTagCreateFormData,
  expenseTagColors,
  expenseTagCreateFormSchema,
  useCreateExpenseTag,
} from '~/features/expense-tag/create/model';
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
  onSubmit?: (expenseTag: ExpenseTag) => void;
};

export function ExpenseTagCreateForm(props: Props) {
  const { onSubmit } = props;

  const { mutate, status } = useCreateExpenseTag({ onSuccess: onSubmit });

  const formId = useId();

  const form = useForm<ExpenseTagCreateFormData>({
    resolver: zodResolver(expenseTagCreateFormSchema),
    defaultValues: {
      color: undefined,
      label: '',
    },
  });

  const handleSubmit: SubmitHandler<ExpenseTagCreateFormData> = useCallback(
    (data) => {
      if (status === 'loading') {
        return;
      }

      mutate(data);
    },
    [mutate, status],
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
                disabled={status === 'loading'}
                placeholder="New tag..."
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
                disabled={status === 'loading'}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Color..." />
                </SelectTrigger>
                <SelectContent>
                  {expenseTagColors.map((color) => (
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
