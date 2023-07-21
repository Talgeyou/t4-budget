'use client';

import { useMemo, useState } from 'react';
import { Currency, Period } from '@prisma/client';
import { PeriodSelector } from '~/entities/period';
import { CurrencySelector, useFetchCurrenciesData } from '~/entities/currency';
import { Card, CardContent, CardHeader, CardTitle } from '~/shared/ui/card';
import { getFormattedMoney } from '~/shared/lib/get-formatted-money';
import { calculateTotal } from '~/shared/lib/calculate-total';
import { Skeleton } from '~/shared/ui/skeleton';

export type TotalDataItem = {
  value: number;
  currency: Currency;
  period: Period;
};

type Props<TData extends TotalDataItem> = {
  title?: string;
  items: TData[];
  icon: React.ReactElement;
};

export function TotalCard<T extends TotalDataItem>(props: Props<T>) {
  const { title, items, icon } = props;

  const { data: currenciesData, status: currenciesStatus } =
    useFetchCurrenciesData();

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    Currency.USD,
  );
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(Period.MONTHLY);

  const total = useMemo(() => {
    if (currenciesStatus !== 'success') {
      return 0;
    }

    return calculateTotal({
      items,
      currency: selectedCurrency,
      currencyRates: currenciesData,
      period: selectedPeriod,
    });
  }, [
    currenciesData,
    currenciesStatus,
    items,
    selectedCurrency,
    selectedPeriod,
  ]);

  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            {icon} {title ?? 'Total'}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <CurrencySelector
              value={selectedCurrency}
              onChange={setSelectedCurrency}
            />
            <PeriodSelector
              value={selectedPeriod}
              onChange={setSelectedPeriod}
            />
          </div>
          {currenciesStatus === 'loading' ? (
            <Skeleton className="w-[9ch] h-7" />
          ) : (
            <span className="text-lg font-medium">
              {getFormattedMoney(total, selectedCurrency)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function TotalCardSkeleton() {
  return <Skeleton className="h-44 w-full" />;
}
