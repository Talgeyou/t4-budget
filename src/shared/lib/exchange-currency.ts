import { Currency } from '@prisma/client';
import { CurrenciesData } from '../api/fetch-currencies';

type ExchangeCurrencyParams = {
  value: number;
  valueCurrency: Currency;
  targetCurrency: Currency;
  currencyRates: CurrenciesData;
};

export function exchangeCurrency(params: ExchangeCurrencyParams) {
  const { currencyRates, targetCurrency, value, valueCurrency } = params;

  return value * currencyRates[valueCurrency][targetCurrency];
}
