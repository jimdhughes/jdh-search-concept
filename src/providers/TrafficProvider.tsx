import {
  ISearchProvider,
  ISearchResult
} from '../components/search/search-list/SearchListComponent';
import { getTrafficByImpact } from '../services/data.services';
import * as React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
/**
 "disruption_number": "8",
"starting_date": "2018-12-05T00:00:00",
"impact": "Travel Delays",
"description": "Right Turn Bay Construction",
"duration": "Up To 7 Months",
"finish_date": "2019-06-30T00:00:00",
"date_issued": "2019-01-16T00:00:00",
"traffic_district": "Northwest",
"infrastructure": "Road and Sidewalk",
"activity_type": "Construction",
"from": "111 Avenue NW",
"details": "As part of the 2018 - 111 Ave, 142 St - 149 St Rehabilitation Project, the 149 St northbound to eastbound right turn bay at 111ave will remain closed until June 2019. Pedestrian access will be maintained via a temporary walkway to access the intersection",
"location": {
"latitude": "53.558897550328254",
"human_address": "{\"address\":\"\",\"city\":\"\",\"state\":\"\",\"zip\":\"\"}",
"needs_recoding": false,
"longitude": "-113.57807459215901"
},
"closure": "149 St NB To EB Right Turn Bay Construction",
"status": "Current",
"on": "149 Street NW"
 */

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
          {obj.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
