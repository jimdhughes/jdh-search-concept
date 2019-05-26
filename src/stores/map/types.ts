export interface ILocation {
  lat: number;
  lon: number;
}

export interface IMapState {
  center: ILocation;
  zoom: number;
}

export const SET_MAP_CENTER = 'SET_MAP_CENTER';
export const SET_MAP_ZOOM = 'SET_MAP_ZOOM';

interface ISetMapCenterAction {
  type: typeof SET_MAP_CENTER;
  payload: ILocation;
}

interface ISetMapZoomAction {
  type: typeof SET_MAP_ZOOM;
  payload: number;
}

export type MapActionTypes = ISetMapCenterAction | ISetMapZoomAction;
