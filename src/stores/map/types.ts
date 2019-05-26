export interface ILocation {
  lat: number;
  lon: number;
}

export interface IMapState {
  center: ILocation;
  zoom: number;
  focus: ILocation | null;
}

export const SET_MAP_CENTER = 'SET_MAP_CENTER';
export const SET_MAP_ZOOM = 'SET_MAP_ZOOM';
export const SET_MAP_FOCUS = 'SET_MAP_FOCUS';

interface ISetMapCenterAction {
  type: typeof SET_MAP_CENTER;
  payload: ILocation;
}

interface ISetMapZoomAction {
  type: typeof SET_MAP_ZOOM;
  payload: number;
}

interface ISetMapFocus{
  type: typeof SET_MAP_FOCUS;
  payload: ILocation;
}

export type MapActionTypes = ISetMapCenterAction | ISetMapZoomAction | ISetMapFocus;
