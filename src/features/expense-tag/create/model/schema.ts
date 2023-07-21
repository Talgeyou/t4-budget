import { z } from 'zod';

export const expenseTagColors = [
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

export const expenseTagCreateFormSchema = z.object({
  label: z.string().min(1),
  color: z.string().min(1),
});

export type ExpenseTagCreateFormData = z.infer<
  typeof expenseTagCreateFormSchema
>;

export const expenseTagCreateDtoSchema = expenseTagCreateFormSchema;

export type ExpenseTagCreateDto = z.infer<typeof expenseTagCreateDtoSchema>;
