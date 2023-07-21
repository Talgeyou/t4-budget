import { Currency, Period } from '@prisma/client';
import { z } from 'zod';

export const incomeCreateFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  tagIds: z.array(z.string().cuid()),
  value: z.number(),
  currency: z.nativeEnum(Currency),
  period: z.nativeEnum(Period),
});

export type IncomeCreateFormData = z.infer<typeof incomeCreateFormSchema>;

export const createIncomeDtoSchema = incomeCreateFormSchema;

export type CreateIncomeDto = z.infer<typeof createIncomeDtoSchema>;
