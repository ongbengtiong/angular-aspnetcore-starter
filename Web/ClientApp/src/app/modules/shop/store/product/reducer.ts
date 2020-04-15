import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { fromShopActions } from "../actions";
import { Product } from "../../models/product";

export const PRODUCT_FEATURE_KEY = "product";

export interface ProductState extends EntityState<Product> {
  loaded: boolean;
  error?: Error | any;
  pagination: any;
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  // In this case this would be optional since primary key is id
  selectId: item => item.productId
});

export interface EntityPartialState {
  readonly [PRODUCT_FEATURE_KEY]: ProductState;
}

export const productInitialState: ProductState = productAdapter.getInitialState({
  // Additional entity state properties
  loaded: false,
  error: null,
  pagination: {
    totalCount: 0,
    pageSize: 0
  }
});

