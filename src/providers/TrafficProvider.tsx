import {
  ISearchProvider,
  ISearchResult
} from '../components/search/search-list/SearchListComponent';
import { getTrafficByImpact } from '../services/data.services';
import * as React from 'react';

export function getTrafficProvider(): ISearchProvider {
  return {
    command: getTrafficData,
    renderer: getTrafficRenderer
  };
}

function mapTrafficSearchResult(result: any): ISearchResult {
  return {
    businessUnit: 'Traffic',
    type: 'traffic',
    result
  };
}

async function getTrafficData(id: string): Promise<ISearchResult[]> {
  try {
    let data = await getTrafficByImpact(id);
    if (!(data instanceof Array)) {
      data = [data];
    }
    return data.map(mapTrafficSearchResult);
  } catch (e) {
    return [];
  }
}

function getTrafficRenderer(x: ISearchResult): JSX.Element {
  return (
    <div>
      <h3>BU: {x.businessUnit}</h3>
      <h3>Data: {JSON.stringify(x.result)} </h3>
    </div>
  );
}
