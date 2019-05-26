import {
  ISearchProvider,
  ISearchResult
} from '../components/search/search-list/SearchListComponent';
import { getPropertyValues } from '../services/data.services';
import * as React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import store from '../stores/store';
import { SET_MAP_CENTER, SET_MAP_ZOOM } from '../stores/map/types';

interface IPropertyValue {
  account_number: string;
  house_number: string;
  suite: string;
  street_name: string;
  total_asmt: string;
  tax_class: string;
  neighbourhood_id: string;
  ward: string;
  garage: string;
  latitude: string;
  longitude: string;
}

export function getPropertyValueProvider(): ISearchProvider {
  return {
    command: getPropertyValueData,
    renderer: getPropertyValueRenderer
  };
}

function mapPropertyValueSearchResult(result: any): ISearchResult {
  return {
    businessUnit: 'Property',
    type: 'property',
    result: result
  };
}

async function getPropertyValueData(id: string): Promise<ISearchResult[]> {
  try {
    let data = await getPropertyValues(id);
    if (!(data instanceof Array)) {
      data = [data];
    }
    return data.map(mapPropertyValueSearchResult);
  } catch (e) {
    return [];
  }
}
function setMapCenter(x: IPropertyValue) {
  store.dispatch({
    type: SET_MAP_CENTER,
    payload: { lat: parseFloat(x.latitude), lon: parseFloat(x.longitude) }
  });
  store.dispatch({
    type: SET_MAP_ZOOM,
    payload: 19
  });
}

function getPropertyValueRenderer(x: ISearchResult): JSX.Element {
  let obj: IPropertyValue = x.result as IPropertyValue;
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {x.businessUnit}
        </Typography>
        <Typography variant="h5" component="h5">
          House Valuation
        </Typography>
        <Typography variant="body2" component="p">
          {obj.suite ? obj.suite + ' - ' : ''} {obj.house_number} - {obj.street_name} @{' '}
          {obj.total_asmt}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => setMapCenter(obj)}>Go To</Button>
      </CardActions>
    </Card>
  );
}
