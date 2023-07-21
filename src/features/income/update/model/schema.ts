import { Currency, Period } from '@prisma/client';
import { z } from 'zod';

export const incomeUpdateFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  tagIds: z.array(z.string().cuid()),
  value: z.number(),
  currency: z.nativeEnum(Currency),
  period: z.nativeEnum(Period),
});

export type IncomeUpdateFormData = z.infer<typeof incomeUpdateFormSchema>;

export const incomeUpdateDtoSchema = incomeUpdateFormSchema;

export type IncomeUpdateDto = z.infer<typeof incomeUpdateDtoSchema>;
