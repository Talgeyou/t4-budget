import { Currency, Period } from '@prisma/client';
import { z } from 'zod';

export const expenseUpdateFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  tagIds: z.array(z.string().cuid()),
  value: z.number(),
  currency: z.nativeEnum(Currency),
  period: z.nativeEnum(Period),
});

export type ExpenseUpdateFormData = z.infer<typeof expenseUpdateFormSchema>;

export const expenseUpdateDtoSchema = expenseUpdateFormSchema;

export type ExpenseUpdateDto = z.infer<typeof expenseUpdateDtoSchema>;
