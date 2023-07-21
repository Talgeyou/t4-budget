import { z } from 'zod';

export const incomeTagColors = [
  {
    label: 'Red',
    value: '#f87171',
  },
  {
    label: 'Orange',
    value: '#fb923c',
  },
  {
    label: 'Amber',
    value: '#fbbf24',
  },
  {
    label: 'Yellow',
    value: '#facc15',
  },

  {
    label: 'Lime',
    value: '#a3e635',
  },
  {
    label: 'Green',
    value: '#4ade80',
  },
  {
    label: 'Blue',
    value: '#60a5fa',
  },
  {
    label: 'Purple',
    value: '#c084fc',
  },
];

export const incomeTagCreateFormSchema = z.object({
  label: z.string().min(1),
  color: z.string().min(1),
});

export type IncomeTagCreateFormData = z.infer<typeof incomeTagCreateFormSchema>;

export const incomeTagCreateDtoSchema = incomeTagCreateFormSchema;

export type IncomeTagCreateDto = z.infer<typeof incomeTagCreateDtoSchema>;
