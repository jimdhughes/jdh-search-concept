import {
  ISearchProvider,
  ISearchResult
} from '../components/search/search-list/SearchListComponent';
import { getTrafficByImpact } from '../services/data.services';
import * as React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import store from '../stores/store';
import { SET_MAP_CENTER, SET_MAP_ZOOM } from '../stores/map/types';

interface ILoc {
  latitude: string;
  longitude: string;
}
interface ITrafficModel {
  disruption_number: string;
  starting_date: string;
  impact: string;
  description: string;
  duration: string;
  finish_date: string;
  date_issued: string;
  traffic_district: string;
  infrastructure: string;
  activity_type: string;
  from: string;
  details: string;
  location: ILoc;
  closure: string;
  status: string;
  on: string;
}

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

function setMapCenter(x: ITrafficModel) {
  store.dispatch({
    type: SET_MAP_CENTER,
    payload: { lat: parseFloat(x.location.latitude), lon: parseFloat(x.location.longitude) }
  });
  store.dispatch({
    type: SET_MAP_ZOOM,
    payload: 14
  });
}

function getTrafficRenderer(x: ISearchResult): JSX.Element {
  let obj: ITrafficModel = x.result as ITrafficModel;
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {x.businessUnit} - Traffic Info
        </Typography>
        <Typography variant="h5" component="h5">
          {obj.impact}
        </Typography>
        <Typography variant="body2" component="p">
          {obj.starting_date} to {obj.finish_date}
        </Typography>
        <Typography variant="body1" component="p">
          {obj.closure}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => setMapCenter(obj)}>Go To</Button>
      </CardActions>
    </Card>
  );
}
