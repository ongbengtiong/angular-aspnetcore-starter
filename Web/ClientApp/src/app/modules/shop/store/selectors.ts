import { createFeatureSelector, createSelector } from "@ngrx/store";

import { PRODUCT_FEATURE_KEY, productAdapter } from "./product/reducer";
import { ORDER_FEATURE_KEY } from "./order/reducer";
import { ShopState } from "./reducer";

// get the selectors
const { selectIds, selectAll, selectTotal } = productAdapter.getSelectors();

/******** Products  */
// Lookup the 'Product' feature state managed by NgRx
const getProductState = createFeatureSelector<ShopState>('shop');


// select the array of Product ids
export const selectProductIds = createSelector(
  getProductState,
  (state: ShopState) => state.products.ids
);

// select the array of Products
export const selectAllProducts = createSelector(
  getProductState,
  (state: ShopState) => {
    const data = [];
    state.products.ids.forEach(id => {
      data.push(state.products.entities[id]);
    });
    return {
      data: data,
      pagination: state.products.pagination
    }
  }
);

// select the total Product count
export const selectProductCount = createSelector(
  getProductState,
  (state: ShopState) => state.products.ids.length
);

// select the Product by Id
export const selectProduct = createSelector(
  getProductState,
  (state: ShopState, prop: { id: number }) => state.products.entities[prop.id]
);

// select entity loaded flag
export const selectProductLoaded = createSelector(
  getProductState,
  state => state.products.loaded
);

// select entity error
export const selectProductError = createSelector(
  getProductState,
  state => state.products.error
);




/******** Orders  */
// Lookup the 'Order' feature state managed by NgRx
const getOrderState = createFeatureSelector<ShopState>(ORDER_FEATURE_KEY);

// select the array of Order ids
export const selectOrderIds = createSelector(
  getOrderState,
  (state: ShopState) => state.orders.ids
);

// select the array of Orders
export const selectAllOrders = createSelector(
  getOrderState,
  (state: ShopState) => {
    return Object.values(state.orders.entities);
  }
);

// select the total Order count
export const selectOrderCount = createSelector(
  getOrderState,
  (state: ShopState) => state.orders.ids.length
);

// select the Order by Id
export const selectOrder = createSelector(
  getOrderState,
  (state: ShopState, prop: { id: number }) => state.orders.entities[prop.id]
);

// select entity loaded flag
export const selectOrderLoaded = createSelector(
  getOrderState,
  state => state.orders.loaded
);

// select entity error
export const selectOrderError = createSelector(
  getOrderState,
  state => state.orders.error
);

