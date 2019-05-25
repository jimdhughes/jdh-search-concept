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
    businessUnit: 'Crypto Currency',
    type: 'crypto',
    results: results
  };
}

async function getCoinInfoSearch(id: string): Promise<ISearchResult[]> {
  try {
    let coins = await getCoinInfo(id);
    if (!(coins instanceof Array)) {
      coins = [coins];
    }
    return coins.map(mapCoinSearchResult);
  } catch (e) {
    return [];
  }
}

function getCoinInfoRenderer(x: ISearchResult): JSX.Element {
  return (
    <div>
      <h3>BU: {x.businessUnit}</h3>
      <h3>Data: {JSON.stringify(x.results)} </h3>
    </div>
  );
}

function navigateToDetail(x: ISearchResult) {

}