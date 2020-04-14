import { createAction, props } from "@ngrx/store";

import { Order } from "../models/order";
import { Product } from "../models/product";


export enum ProductActionTypes {

  LoadProducts = "[Product] Load Products",
  LoadProductsSuccess = "[Product] Load Products Success",
  LoadProductsFail = "[Product] Load Products Fail",
  LoadProduct = "[Product] Load Product",
  LoadProductSuccess = "[Product] Load Product Success",
  LoadProductFail = "[Product] Load Product Fail",
  UpdateProduct = "[Product] Update Product",
  UpdateProductSuccess = "[Product] Update Product Success",
  UpdateProductFail = "[Product] Update Product Fail",
  CreateProduct = "[Product] CreateProduct",
  CreateProductFail = "[Product] CreateProductFail",
  CreateProductSuccess = "[Product] CreateProductSuccess",
  DeleteProduct = "[Product] DeleteProduct",
  DeleteProductSuccess = "[Product] DeleteProductSuccess",
  DeleteProductFail = "[Product] DeleteProductFail"

}

export enum OrderActionTypes {
  LoadOrders = "[Order] Load Orders",
  LoadOrdersSuccess = "[Order] Load Orders Success",
  LoadOrdersFail = "[Order] Load Orders Fail",
  LoadOrder = "[Order] Load Order",
  LoadOrderSuccess = "[Order] Load Order Success",
  LoadOrderFail = "[Order] Load Order Fail",
  UpdateOrder = "[Order] Update Order",
  UpdateOrderSuccess = "[Order] Update Order Success",
  UpdateOrderFail = "[Order] Update Order Fail",
  CreateOrder = "[Order] CreateOrder",
  CreateOrderFail = "[Order] CreateOrderFail",
  CreateOrderSuccess = "[Order] CreateOrderSuccess",
  DeleteOrder = "[Order] DeleteOrder",
  DeleteOrderSuccess = "[Order] DeleteOrderSuccess",
  DeleteOrderFail = "[Order] DeleteOrderFail"
}



export const loadProducts = createAction(ProductActionTypes.LoadProducts);

export const loadProductsSuccess = createAction(
  ProductActionTypes.LoadProductsSuccess,
  props<{ data: Product[] }>()
);

export const loadProductsFail = createAction(
  ProductActionTypes.LoadProductsFail,
  props<{ error: Error | any }>()
);

export const loadProduct = createAction(
  ProductActionTypes.LoadProduct,
  props<{ id: number }>()
);

export const loadProductSuccess = createAction(
  ProductActionTypes.LoadProductSuccess,
  props<{ entity: Product }>()
);

export const loadProductFail = createAction(
  ProductActionTypes.LoadProductFail,
  props<{ error: Error | any }>()
);

export const updateProduct = createAction(
  ProductActionTypes.UpdateProduct,
  props<{ update: Product }>()
);

export const updateProductSuccess = createAction(
  ProductActionTypes.UpdateProductSuccess,
  props<{ entity: Product }>()
);

export const updateProductFail = createAction(
  ProductActionTypes.UpdateProductFail,
  props<{ error: Error | any }>()
);
/**** Create ********* */
export const createProduct = createAction(
  ProductActionTypes.CreateProduct,
  props<{ new: Product }>()
);

export const createProductSuccess = createAction(
  ProductActionTypes.CreateProductSuccess,
  props<{ entity: Product }>()
);

export const createProductFail = createAction(
  ProductActionTypes.CreateProductFail,
  props<{ error: Error | any }>()
);

/**** Delete ********* */
export const deleteProduct = createAction(
  ProductActionTypes.DeleteProduct,
  props<{ id: number }>()
);

export const deleteProductSuccess = createAction(
  ProductActionTypes.DeleteProductSuccess
);

export const deleteProductFail = createAction(
  ProductActionTypes.DeleteProductFail,
  props<{ error: Error | any }>()
);

export const loadOrders = createAction(OrderActionTypes.LoadOrders);

export const loadOrdersSuccess = createAction(
  OrderActionTypes.LoadOrdersSuccess,
  props<{ data: Order[] }>()
);

export const loadOrdersFail = createAction(
  OrderActionTypes.LoadOrdersFail,
  props<{ error: Error | any }>()
);

export const loadOrder = createAction(
  OrderActionTypes.LoadOrder,
  props<{ id: number }>()
);

export const loadOrderSuccess = createAction(
  OrderActionTypes.LoadOrderSuccess,
  props<{ entity: Order }>()
);

export const loadOrderFail = createAction(
  OrderActionTypes.LoadOrderFail,
  props<{ error: Error | any }>()
);

export const updateOrder = createAction(
  OrderActionTypes.UpdateOrder,
  props<{ update: Order }>()
);

export const updateOrderSuccess = createAction(
  OrderActionTypes.UpdateOrderSuccess,
  props<{ entity: Order }>()
);

export const updateOrderFail = createAction(
  OrderActionTypes.UpdateOrderFail,
  props<{ error: Error | any }>()
);
/**** Create ********* */
export const createOrder = createAction(
  OrderActionTypes.CreateOrder,
  props<{ new: Order }>()
);

export const createOrderSuccess = createAction(
  OrderActionTypes.CreateOrderSuccess,
  props<{ entity: Order }>()
);

export const createOrderFail = createAction(
  OrderActionTypes.CreateOrderFail,
  props<{ error: Error | any }>()
);

/**** Delete ********* */
export const deleteOrder = createAction(
  OrderActionTypes.DeleteOrder,
  props<{ id: number }>()
);

export const deleteOrderSuccess = createAction(
  OrderActionTypes.DeleteOrderSuccess
);

export const deleteOrderFail = createAction(
  OrderActionTypes.DeleteOrderFail,
  props<{ error: Error | any }>()
);


export const fromShopActions = {
  loadProducts,
  loadProductsFail,
  loadProductsSuccess,
  loadProduct,
  loadProductFail,
  loadProductSuccess,
  updateProduct,
  updateProductSuccess,
  updateProductFail,
  createProduct,
  createProductSuccess,
  createProductFail,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFail,

  loadOrders,
  loadOrdersFail,
  loadOrdersSuccess,
  loadOrder,
  loadOrderFail,
  loadOrderSuccess,
  updateOrder,
  updateOrderSuccess,
  updateOrderFail,
  createOrder,
  createOrderSuccess,
  createOrderFail,
  deleteOrder,
  deleteOrderSuccess,
  deleteOrderFail

};
