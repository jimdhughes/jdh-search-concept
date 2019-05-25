import { get } from './api.service';

export function getGameOfThronesBook(id: string): Promise<any[]> {
  return get('https://anapioficeandfire.com/api/books/' + id);
}

export function getNameDays(term: string): Promise<any[]> {
  return get('https://api.abalin.net/get/tomorrow');
}
//api.coingecko.com/api/v3/coins
export function getCoinInfo(term: string): Promise<any[]> {
  return get('https://api.coingecko.com/api/v3/coins/' + term).catch(e => []);
}

export function getCurrencyConversionFromBase(base: string): Promise<any[]> {
  return get('https://api.exchangeratesapi.io/latest?base=' + base);
}
