import { Currency, Period } from '@prisma/client';
import { calculateByPeriod } from './calculate-by-period';
import { exchangeCurrency } from './exchange-currency';
import { CurrenciesData } from '../api/fetch-currencies';

type CalculateTotalItem = {
  value: number;
  currency: Currency;
  period: Period;
};

type CalculateTotalParams<T extends CalculateTotalItem> = {
  items: T[];
  currency: Currency;
  period: Period;
  currencyRates: CurrenciesData;
};

export function calculateTotal<TData extends CalculateTotalItem>(
  params: CalculateTotalParams<TData>,
) {
  const { currency, items, period, currencyRates } = params;

  return items.reduce((result, item) => {
    let calculatedValue = item.value;

    calculatedValue = calculateByPeriod({
      value: calculatedValue,
      valuePeriod: item.period,
      targetPeriod: period,
    });

    calculatedValue = exchangeCurrency({
      value: calculatedValue,
      valueCurrency: item.currency,
      targetCurrency: currency,
      currencyRates,
    });

    return result + calculatedValue;
  }, 0);
}
