import {
  ISearchProvider,
  ISearchResult
} from '../components/search/search-list/SearchListComponent';
import { getCoinInfo } from '../services/data.services';
import * as React from 'react';

export function getCoinProvider(): ISearchProvider {
  return {
    command: getCoinInfoSearch,
    renderer: getCoinInfoRenderer
  };
}

function mapCoinSearchResult(results: any[]): ISearchResult {
  return {
    businessUnit: 'Coin Info',
    type: 'crypto',
    results: results
  };
}

async function getCoinInfoSearch(id: string): Promise<ISearchResult[]> {
  let days = await getCoinInfo(id);
  if (!(days instanceof Array)) {
    days = [days];
  }
  return days.map(mapCoinSearchResult);
}

function getCoinInfoRenderer(x: ISearchResult): JSX.Element {
  return (
    <div>
      <h3>BU: {x.businessUnit}</h3>
      <h3>Data: {JSON.stringify(x.results)} </h3>
    </div>
  );
}
