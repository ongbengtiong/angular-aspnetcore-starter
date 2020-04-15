import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { fromShopActions } from "./actions";
import { Product } from "../models/product";
import { OrderState, orderAdapter, orderInitialState } from "./order/reducer";
import { ProductState, productAdapter, productInitialState } from "./product/reducer";




export interface ShopState {
  products: ProductState;
  orders: OrderState;
}

export const initialState: ShopState = {
  products: productInitialState,
  orders: orderInitialState

};


const _reducer = createReducer(
  initialState,
  on(fromShopActions.loadOrdersSuccess, (state, { data }) => {
    return {
      ...state,
      orders: orderAdapter.addAll(data, {
        ...state.orders,
        loaded: true
      })
    };
  }),
  on(fromShopActions.loadOrdersFail, (state, { error }) => {
    return {
      ...state,
      orders: { ...state.orders, error: error }
    };
  }),
  on(fromShopActions.loadOrderSuccess, (state, { entity }) => {
    return {
      ...state,
      orders: orderAdapter.addOne(entity, state.orders)
    };
  }),
  on(fromShopActions.loadOrderFail, (state, { error }) => {
    return {
      ...state,
      orders: { ...state.orders, error }
    };
  }),
  on(fromShopActions.updateOrder, (state, { update }) => {
    return {
      ...state,
      orders: orderAdapter.updateOne({ id: update.orderId, changes: update }, state.orders)
    }
  }),
  on(fromShopActions.updateOrderFail, (state, { error }) => {
    return {
      ...state,
      orders: { ...state.orders, error }
    };
  }),
  on(fromShopActions.createOrder, (state, action) => {
    return {
      ...state,
      orders: orderAdapter.addOne(action.new, state.orders)
    }
  }),
  on(fromShopActions.createOrderFail, (state, { error }) => {
    return {
      ...state,
      orders: { ...state.orders, error }
    };
  }),
  on(fromShopActions.deleteOrder, (state, action) => {
    return {
      ...state,
      orders: orderAdapter.removeOne(action.id, state.orders)
    }
  }),
  on(fromShopActions.deleteOrderFail, (state, { error }) => {
    return {
      ...state,
      orders: { ...state.orders, error }
    };
  }),





  on(fromShopActions.loadProductsSuccess, (state, { data, pagination }) => {
    const newState =    {
      ...state,
      products: productAdapter.addAll(data, {
        ...state.products,
        loaded: true,
        pagination: pagination
      })
    };
    return newState;
  }),
  on(fromShopActions.loadProductsFail, (state, { error }) => {
    return {
      ...state,
      products: { ...state.products, error: error }
    };
  }),
  on(fromShopActions.loadProductSuccess, (state, { entity }) => {
    return {
      ...state,
      products: productAdapter.addOne(entity, state.products)
    };
  }),
  on(fromShopActions.loadProductFail, (state, { error }) => {
    return {
      ...state,
      products: { ...state.products, error }
    };
  }),
  on(fromShopActions.updateProduct, (state, { update }) => {
    return {
      ...state,
      products: productAdapter.updateOne({ id: update.productId, changes: update }, state.products)
    }
  }),
  on(fromShopActions.updateProductFail, (state, { error }) => {
    return {
      ...state,
      products: { ...state.products, error }
    };
  }),
  on(fromShopActions.createProduct, (state, action) => {
    return {
      ...state,
      products: productAdapter.addOne(action.new, state.products)
    }
  }),
  on(fromShopActions.createProductFail, (state, { error }) => {
    return {
      ...state,
      products: { ...state.products, error }
    };
  }),
  on(fromShopActions.deleteProduct, (state, action) => {
    return {
      ...state,
      products: productAdapter.removeOne(action.id, state.products)
    }
  }),
  on(fromShopActions.deleteProductFail, (state, { error }) => {
    return {
      ...state,
      products: { ...state.products, error }
    };
  })
);


export function reducer(state: ShopState | undefined, action: Action) {
  return _reducer(state, action);
}
