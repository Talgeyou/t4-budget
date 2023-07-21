'use client';

import { useMemo, useState } from 'react';
import { Currency, Period } from '@prisma/client';
import { CgCalculator } from 'react-icons/cg';
import { CurrencySelector, useFetchCurrenciesData } from '~/entities/currency';
import { PeriodSelector } from '~/entities/period';
import { useFetchIncomes } from '~/entities/income';
import { useFetchExpenses } from '~/entities/expense';
import { calculateTotal } from '~/shared/lib/calculate-total';
import { getFormattedMoney } from '~/shared/lib/get-formatted-money';
import { Card, CardHeader, CardTitle, CardContent } from '~/shared/ui/card';
import { Skeleton } from '~/shared/ui/skeleton';

export function FreeMoneyCard() {
  const { data: incomesData, status: incomesStatus } = useFetchIncomes();
  const { data: expensesData, status: expensesStatus } = useFetchExpenses();
  const { data: currenciesData, status: currenciesStatus } =
    useFetchCurrenciesData();

  const isLoading =
    incomesStatus === 'loading' ||
    expensesStatus === 'loading' ||
    currenciesStatus === 'loading';

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    Currency.USD,
  );
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(Period.MONTHLY);

  const calculatedIncome = useMemo(() => {
    if (incomesStatus !== 'success' || currenciesStatus !== 'success') {
      return 0;
    }

    return calculateTotal({
      items: incomesData,
      currency: selectedCurrency,
      period: selectedPeriod,
      currencyRates: currenciesData,
    });
  }, [
    currenciesData,
    currenciesStatus,
    incomesData,
    incomesStatus,
    selectedCurrency,
    selectedPeriod,
  ]);

  const calculatedExpense = useMemo(() => {
    if (expensesStatus !== 'success' || currenciesStatus !== 'success') {
      return 0;
    }

    return calculateTotal({
      items: expensesData,
      currency: selectedCurrency,
      period: selectedPeriod,
      currencyRates: currenciesData,
    });
  }, [
    currenciesData,
    currenciesStatus,
    expensesData,
    expensesStatus,
    selectedCurrency,
    selectedPeriod,
  ]);

  if (isLoading) {
    return <FreeMoneyCardSkeleton />;
  }

  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <CgCalculator size="1.5rem" /> <span>Free Money</span>
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
          <span className="text-lg font-medium">
            {getFormattedMoney(
              calculatedIncome - calculatedExpense,
              selectedCurrency,
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function FreeMoneyCardSkeleton() {
  return <Skeleton className="h-44 w-full" />;
}
