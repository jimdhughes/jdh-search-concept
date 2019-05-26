import { combineReducers } from 'redux';
import { mapReducer } from './map/reducers';
import { IMapState } from './map/types';

export interface IAppState {
  map: IMapState;
}

export default combineReducers<IAppState>({
  map: mapReducer
});
