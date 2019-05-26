import { IMapState, MapActionTypes, SET_MAP_CENTER, SET_MAP_ZOOM } from './types';

const initialState: IMapState = {
  center: {
    lat: 53.5444,
    lon: -113.4909
  },
  zoom: 12
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
    default:
      return state;
  }
}
