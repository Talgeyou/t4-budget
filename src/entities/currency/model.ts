import { Currency } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { CurrenciesData, fetchCurrencies } from '~/shared/api/fetch-currencies';
import { exchangeCurrency } from '~/shared/lib/exchange-currency';

export const FETCH_CURRENCIES_QUERY_KEY = 'currencies';

export function useFetchCurrenciesData() {
  const query = useQuery({
    queryKey: [FETCH_CURRENCIES_QUERY_KEY],
    queryFn: (ctx) => fetchCurrencies({ signal: ctx.signal }),
  });

  return query;
}

type SortByConvertedCurrencyValueItem = {
  value: number;
  currency: Currency;
};

type SortByConvertedCurrencyValueParams<
  T extends SortByConvertedCurrencyValueItem,
> = {
  a: T;
  b: T;
  currenciesData: CurrenciesData;
};

export function sortByConvertedCurrencyValue<
  T extends SortByConvertedCurrencyValueItem,
>(params: SortByConvertedCurrencyValueParams<T>) {
  const { a, b, currenciesData } = params;

  if (!currenciesData) {
    if (a.value === b.value) return 0;

    return a.value < b.value ? 1 : -1;
  }

  const normalizedA = exchangeCurrency({
    value: a.value,
    targetCurrency: Currency.USD,
    valueCurrency: a.currency,
    currencyRates: currenciesData,
  });
  const normalizedB = exchangeCurrency({
    value: b.value,
    targetCurrency: Currency.USD,
    valueCurrency: b.currency,
    currencyRates: currenciesData,
  });

  if (normalizedA === normalizedB) return 0;

  return normalizedA < normalizedB ? 1 : -1;
}
