'use client';

import { useCallback, useId } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Currency, Period } from '@prisma/client';
import { IncomeTagsSelector, useFetchIncomeTags } from '~/entities/income-tag';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/shared/ui/form';
import { Input } from '~/shared/ui/input';
import { Button } from '~/shared/ui/button';
import { Textarea } from '~/shared/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/shared/ui/select';
import { IncomeCreateFormData, incomeCreateFormSchema } from './model/schema';
import { useCreateIncome } from './model';

export function IncomeCreateForm() {
  const formId = useId();

  const { data: tagsData } = useFetchIncomeTags();

  const form = useForm<IncomeCreateFormData>({
    resolver: zodResolver(incomeCreateFormSchema),
    defaultValues: {
      title: '',
      description: '',
      tagIds: [],
      currency: Currency.USD,
      period: Period.MONTHLY,
      value: 0,
    },
  });

  const resetForm = useCallback(() => form.reset(), [form]);

  const { mutate: createIncome, status: createIncomeStatus } = useCreateIncome({
    onSuccess: resetForm,
  });

  const handleSubmit: SubmitHandler<IncomeCreateFormData> = useCallback(
    (data: IncomeCreateFormData) => {
      if (createIncomeStatus === 'loading') return;

      createIncome(data);
    },
    [createIncome, createIncomeStatus],
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Title"
                disabled={createIncomeStatus === 'loading'}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Textarea
                className="resize-none"
                placeholder="Description"
                disabled={createIncomeStatus === 'loading'}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tagIds"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tags</FormLabel>
              <IncomeTagsSelector
                value={field.value}
                options={tagsData ?? []}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Value</FormLabel>
                <Input
                  type="number"
                  placeholder="0"
                  step="0.01"
                  disabled={createIncomeStatus === 'loading'}
                  {...field}
                  onChange={(event) =>
                    field.onChange(Number.parseFloat(event.target.value))
                  }
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value: Currency) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Currency).map((currency) => (
                        <SelectItem
                          key={currency}
                          value={currency}
                        >
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem className="w-32">
                  <FormLabel>Period</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value: Period) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Period).map((period) => (
                        <SelectItem
                          key={period}
                          value={period}
                        >
                          {period}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          form={formId}
          disabled={createIncomeStatus === 'loading'}
        >
          Create
        </Button>
      </form>
    </Form>
  );
}
