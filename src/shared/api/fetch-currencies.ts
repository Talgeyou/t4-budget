import { Currency } from '@prisma/client';

type EurCurrencyData = {
  eur: {
    kgs: number;
    rub: number;
    usd: number;
  };
};

type KgsCurrencyData = {
  kgs: {
    eur: number;
    rub: number;
    usd: number;
  };
};

type RubCurrencyData = {
  rub: {
    eur: number;
    kgs: number;
    usd: number;
  };
};

type UsdCurrencyData = {
  usd: {
    eur: number;
    kgs: number;
    rub: number;
  };
};

export type CurrenciesData = {
  [Currency.EUR]: {
    [Currency.EUR]: number;
    [Currency.KGS]: number;
    [Currency.RUB]: number;
    [Currency.USD]: number;
  };
  [Currency.KGS]: {
    [Currency.EUR]: number;
    [Currency.KGS]: number;
    [Currency.RUB]: number;
    [Currency.USD]: number;
  };
  [Currency.RUB]: {
    [Currency.EUR]: number;
    [Currency.KGS]: number;
    [Currency.RUB]: number;
    [Currency.USD]: number;
  };
  [Currency.USD]: {
    [Currency.EUR]: number;
    [Currency.KGS]: number;
    [Currency.RUB]: number;
    [Currency.USD]: number;
  };
};

export type FetchCurrenciesParams = {
  signal?: AbortSignal;
};

export async function fetchCurrencies(params?: FetchCurrenciesParams) {
  const currencyResponses = await Promise.all([
    new Promise<EurCurrencyData>(async (resolve) =>
      fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.min.json`,
        { signal: params?.signal },
      )
        .then((response) => response.json())
        .then((data) => resolve(data)),
    ),
    new Promise<KgsCurrencyData>(async (resolve) =>
      fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/kgs.min.json`,
        { signal: params?.signal },
      )
        .then((response) => response.json())
        .then((data) => resolve(data)),
    ),
    new Promise<RubCurrencyData>(async (resolve) =>
      fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/rub.min.json`,
        { signal: params?.signal },
      )
        .then((response) => response.json())
        .then((data) => resolve(data)),
    ),
    new Promise<UsdCurrencyData>(async (resolve) =>
      fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.min.json`,
        { signal: params?.signal },
      )
        .then((response) => response.json())
        .then((data) => resolve(data)),
    ),
  ]);

  const currencies: CurrenciesData = {
    [Currency.EUR]: {
      [Currency.EUR]: 1,
      [Currency.KGS]: currencyResponses[0].eur.kgs,
      [Currency.RUB]: currencyResponses[0].eur.rub,
      [Currency.USD]: currencyResponses[0].eur.usd,
    },
    [Currency.KGS]: {
      [Currency.EUR]: currencyResponses[1].kgs.eur,
      [Currency.KGS]: 1,
      [Currency.RUB]: currencyResponses[1].kgs.rub,
      [Currency.USD]: currencyResponses[1].kgs.usd,
    },
    [Currency.RUB]: {
      [Currency.EUR]: currencyResponses[2].rub.eur,
      [Currency.KGS]: currencyResponses[2].rub.kgs,
      [Currency.RUB]: 1,
      [Currency.USD]: currencyResponses[2].rub.usd,
    },
    [Currency.USD]: {
      [Currency.EUR]: currencyResponses[3].usd.eur,
      [Currency.KGS]: currencyResponses[3].usd.kgs,
      [Currency.RUB]: currencyResponses[3].usd.rub,
      [Currency.USD]: 1,
    },
  };

  return currencies;
}
