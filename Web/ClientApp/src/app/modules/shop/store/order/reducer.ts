import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { fromShopActions } from "../actions";
import { Order } from "../../models/order";

export const ORDER_FEATURE_KEY = "order";

export interface OrderState extends EntityState<Order> {
  loaded: boolean;
  error?: Error | any;
}

export const orderAdapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  // In this case this would be optional since primary key is id
  selectId: item => item.orderId
});

export interface OrderPartialState {
  readonly [ORDER_FEATURE_KEY]: OrderState;
}

export const orderInitialState: OrderState = orderAdapter.getInitialState({
  // Additional entity state properties
  loaded: false,
  error: null
});

