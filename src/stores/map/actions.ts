import { ILocation, MapActionTypes, SET_MAP_CENTER, SET_MAP_ZOOM, SET_MAP_FOCUS } from './types';

export function setMapCenter(center: ILocation): MapActionTypes {
  return {
    type: SET_MAP_CENTER,
    payload: center
  };
}

export function setMapZoom(zoom: number): MapActionTypes {
  return {
    type: SET_MAP_ZOOM,
    payload: zoom
  };
}

export function setMapFocus(loc: ILocation): MapActionTypes {
  return {
    type: SET_MAP_FOCUS,
    payload: loc
  }
}