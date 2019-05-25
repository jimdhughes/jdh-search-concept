import { get } from './api.service';

export function getCoinInfo(term: string): Promise<any[]> {
  return get('https://api.coingecko.com/api/v3/coins/' + term).catch(e => []);
}

export function getCurrencyConversionFromBase(base: string): Promise<any[]> {
  return get('https://api.exchangeratesapi.io/latest?base=' + base);
}

//https://data.edmonton.ca/resource/87ck-293k.json?impact=Total%20Closure
export function getTrafficByImpact(search: string): Promise<any[]> {
  return get('https://data.edmonton.ca/resource/87ck-293k.json?$q=' + search);
}
//https://data.edmonton.ca/resource/3pdp-qp95.json
export function getPropertyValues(search: string): Promise<any[]> {
  return get('https://data.edmonton.ca/resource/3pdp-qp95.json?$q=' + search);
}
