import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromEntity from '../modules/entity/store/reducer';
import * as fromShop from '../modules/shop/store/reducer';

export interface State {
  entity: fromEntity.State,
  shop: fromShop.ShopState
}

export const reducers: ActionReducerMap<State> = {
  entity: fromEntity.reducer,
  shop: fromShop.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
