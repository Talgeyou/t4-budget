'use client';

import { useCallback, useId } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Currency,
  Income,
  IncomeTag,
  Period,
  TagOnIncome,
} from '@prisma/client';
import { CgMathPlus } from 'react-icons/cg';
import { useFetchIncomeTags } from '~/entities/income-tag';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/shared/ui/form';
import { Input } from '~/shared/ui/input';
import { Button, buttonVariants } from '~/shared/ui/button';
import { Textarea } from '~/shared/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/shared/ui/select';
import { Checkbox } from '~/shared/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/shared/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '~/shared/ui/popover';
import { IncomeUpdateFormData, incomeUpdateFormSchema } from './model/schema';
import { useUpdateIncome } from './model';

type Props = {
  income: Income & { tags: (TagOnIncome & { tag: IncomeTag })[] };
};

export function IncomeUpdateForm(props: Props) {
  const { income } = props;

  const { data: tagsData } = useFetchIncomeTags();
  const { mutate: updateIncome, status: updateIncomeStatus } =
    useUpdateIncome();

  const formId = useId();

  const form = useForm<IncomeUpdateFormData>({
    resolver: zodResolver(incomeUpdateFormSchema),
    defaultValues: {
      title: income.title,
      description: income.description ?? '',
      tagIds: income.tags.map((tag) => tag.tagId),
      currency: income.currency,
      period: income.period,
      value: income.value,
    },
  });

  const handleSubmit: SubmitHandler<IncomeUpdateFormData> = useCallback(
    (data: IncomeUpdateFormData) => {
      if (updateIncomeStatus === 'loading') return;

      updateIncome({ incomeId: income.id, dto: data });
    },
    [income.id, updateIncome, updateIncomeStatus],
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
                disabled={updateIncomeStatus === 'loading'}
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
                placeholder="Description"
                disabled={updateIncomeStatus === 'loading'}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tagIds"
          render={({ field }) => {
            const handleClickTag = (tagId: string, checked: boolean) => {
              const fieldSelected = field.value.some((item) => item === tagId);

              if (checked && !fieldSelected) {
                field.onChange([...field.value, tagId]);
              }

              if (!checked && fieldSelected) {
                field.onChange(field.value.filter((item) => item !== tagId));
              }
            };

            return (
              <FormItem className="flex flex-col">
                <FormLabel>Tags</FormLabel>
                <Popover modal>
                  <PopoverTrigger
                    className={buttonVariants({
                      variant: 'outline',
                      className: 'font-normal',
                    })}
                  >
                    <span>
                      {field.value && field.value.length ? (
                        <ul className="flex flex-wrap gap-2">
                          {field.value.map((tagId) => {
                            const tag = tagsData?.find(
                              (tag) => tag.id === tagId,
                            );

                            return (
                              <li
                                className="p-1 rounded-lg"
                                key={tagId}
                                style={{ backgroundColor: tag?.color }}
                              >
                                {tag?.label ?? tagId}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        'Select tags...'
                      )}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent>
                    <ul>
                      {tagsData?.map((tag) => (
                        <li key={tag.id}>
                          <label className="flex items-center gap-2">
                            <Checkbox
                              checked={field.value.some(
                                (tagId) => tagId === tag.id,
                              )}
                              onCheckedChange={(checked) =>
                                handleClickTag(
                                  tag.id,
                                  typeof checked === 'boolean'
                                    ? checked
                                    : false,
                                )
                              }
                            />
                            <div
                              className="w-4 h-4"
                              style={{ backgroundColor: tag.color }}
                            />
                            <span>{tag.label}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            );
          }}
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
                  disabled={updateIncomeStatus === 'loading'}
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
          disabled={updateIncomeStatus === 'loading'}
        >
          Update
        </Button>
      </form>
    </Form>
  );
}

export function IncomeUpdateDialog(props: Props) {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          variant: 'outline',
          className: 'flex items-center gap-2',
        })}
      >
        <span>Create new income</span> <CgMathPlus size="1.25rem" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new income</DialogTitle>
        </DialogHeader>
        <IncomeUpdateForm {...props} />
      </DialogContent>
    </Dialog>
  );
}
