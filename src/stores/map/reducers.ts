import { IMapState, MapActionTypes, SET_MAP_CENTER, SET_MAP_ZOOM, SET_MAP_FOCUS } from './types';

const initialState: IMapState = {
  center: {
    lat: 53.545883,
    lon: -113.490112
  },
  zoom: 11,
  focus: null
};

export function mapReducer(state = initialState, action: MapActionTypes): IMapState {
  switch (action.type) {
    case SET_MAP_CENTER:
      return {
        ...state,
        center: action.payload
      };
    case SET_MAP_ZOOM:
      return {
        ...state,
        zoom: action.payload
      };
    case SET_MAP_FOCUS:
      return {
        ...state,
        focus: action.payload
      }
    default:
      return state;
  }
}
