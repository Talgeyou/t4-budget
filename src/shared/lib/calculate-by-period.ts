import { Period } from '@prisma/client';

const periodRates: Record<Period, Record<Period, number>> = {
  [Period.DAILY]: {
    [Period.DAILY]: 1,
    [Period.MONTHLY]: 30,
    [Period.ONCE]: 0,
    [Period.WEEKLY]: 7,
    [Period.YEARLY]: 365,
  },
  [Period.MONTHLY]: {
    [Period.DAILY]: 1 / 30,
    [Period.MONTHLY]: 1,
    [Period.ONCE]: 0,
    [Period.WEEKLY]: 1 / 4,
    [Period.YEARLY]: 12,
  },
  [Period.ONCE]: {
    [Period.DAILY]: 0,
    [Period.MONTHLY]: 0,
    [Period.ONCE]: 0,
    [Period.WEEKLY]: 0,
    [Period.YEARLY]: 0,
  },
  [Period.WEEKLY]: {
    [Period.DAILY]: 1 / 7,
    [Period.MONTHLY]: 4,
    [Period.ONCE]: 0,
    [Period.WEEKLY]: 1,
    [Period.YEARLY]: 1 / 52,
  },
  [Period.YEARLY]: {
    [Period.DAILY]: 1 / 365,
    [Period.MONTHLY]: 1 / 12,
    [Period.ONCE]: 0,
    [Period.WEEKLY]: 1 / 52,
    [Period.YEARLY]: 1,
  },
};

type CalculateByPeriodParams = {
  value: number;
  valuePeriod: Period;
  targetPeriod: Period;
};

export function calculateByPeriod(params: CalculateByPeriodParams) {
  const { targetPeriod, value, valuePeriod } = params;

  return value * periodRates[valuePeriod][targetPeriod];
}
