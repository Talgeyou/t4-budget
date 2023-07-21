import { Currency, Period } from '@prisma/client';
import { z } from 'zod';

export const expenseCreateFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  tagIds: z.array(z.string().cuid()),
  value: z.number(),
  currency: z.nativeEnum(Currency),
  period: z.nativeEnum(Period),
});

export type ExpenseCreateFormData = z.infer<typeof expenseCreateFormSchema>;

export const createExpenseDtoSchema = expenseCreateFormSchema;

export type CreateExpenseDto = z.infer<typeof createExpenseDtoSchema>;
