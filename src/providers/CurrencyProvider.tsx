import {
  ISearchProvider,
  ISearchResult
} from '../components/search/search-list/SearchListComponent';
import { getCurrencyConversionFromBase } from '../services/data.services';
import * as React from 'react';

export function getCurrencyProvider(): ISearchProvider {
  return {
    command: getCurrencyConversion,
    renderer: getCurrencyConversionRenderer
  };
}

function mapCurrencySearchResult(results: any[]): ISearchResult {
  return {
    businessUnit: 'CurrencyInfo',
    type: 'crypto',
    results: results
  };
}

async function getCurrencyConversion(id: string): Promise<ISearchResult[]> {
  try {
    let currency = await getCurrencyConversionFromBase(id);
    if (!(currency instanceof Array)) {
      currency = [currency];
    }
    return currency.map(mapCurrencySearchResult);
  } catch (e) {
    return [];
  }
}

function getCurrencyConversionRenderer(x: ISearchResult): JSX.Element {
  return (
    <div>
      <h3>BU: {x.businessUnit}</h3>
      <h3>Data: {JSON.stringify(x.results)} </h3>
    </div>
  );
}
