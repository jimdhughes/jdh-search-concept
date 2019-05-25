import { get } from './api.service';

export function getCoinInfo(term: string): Promise<any[]> {
  return get('https://api.coingecko.com/api/v3/coins/' + term).catch(e => []);
}

export function getCurrencyConversionFromBase(base: string): Promise<any[]> {
  return get('https://api.exchangeratesapi.io/latest?base=' + base);
}
