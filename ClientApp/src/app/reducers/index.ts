import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromEntity from '../modules/entity/store/reducer';

export interface State {
  entity: fromEntity.State
}

export const reducers: ActionReducerMap<State> = {
  entity: fromEntity.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
