import { Currency } from '@prisma/client';

export function getFormattedMoney(amount: number, currency: Currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
