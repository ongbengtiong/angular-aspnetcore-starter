import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";

import { fromShopActions } from "./actions";
import { undo } from "ngrx-undo";
import { ShopService } from "../services/shop.service";
import { QueryParams } from "../../../shared/models/query-params";

@Injectable()
export class ShopEffects {
  /*** Products ****/
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromShopActions.loadProducts),
      switchMap(({ queryParams }) =>
        this.shopService.getProducts(queryParams).pipe(
          map((res: any) => {
            return fromShopActions.loadProductsSuccess({
              data: res.data,
              pagination: res.pagination
            });
          }),
          catchError(error => {
            return of(
              fromShopActions.loadProductsFail({
                error
              })
            );
          })
        )
      )
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromShopActions.loadProduct),
      switchMap(({ id }) =>
        this.shopService.getProduct(id).pipe(
          map((res: any) => {
            return fromShopActions.loadProductSuccess({
              entity: res.data
            });
          }),
          catchError(error => {
            return of(
              fromShopActions.loadProductFail({
                error
              })
            );
          })
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromShopActions.updateProduct),
      switchMap(action =>
        this.shopService.updateProduct(action.update.productId, action.update).pipe(
          map((res: any) => {
            return fromShopActions.updateProductSuccess({
              entity: res.data
            });
          }),
          catchError(error => {
            return of(
              fromShopActions.updateProductFail({
                error
              }),
              undo(action)
            );
          })
        )
      )
    )
  );
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromShopActions.createProduct),
      switchMap(action =>
        this.shopService.createProduct(action.new).pipe(
          map((res: any) => {
            return fromShopActions.createProductSuccess({
              entity: res.data
            });
          }),
          catchError(error => {
            return of(
              fromShopActions.createProductFail({
                error
              }),
              undo(action)
            );
          })
        )
      )
    )
  );
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromShopActions.deleteProduct),
      switchMap(action =>
        this.shopService.deleteProduct(action.id).pipe(
          map(() => {
            return fromShopActions.deleteProductSuccess();
          }),
          catchError(error => {
            return of(
              fromShopActions.deleteProductFail({
                error
              }),
              undo(action)
            );
          })
        )
      )
    )
  );



  /*** Orders ****/
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromShopActions.loadOrders),
      switchMap(() =>
        this.shopService.getOrders().pipe(
          map((res: any) => {
            return fromShopActions.loadOrdersSuccess({
              data: res.data
            });
          }),
          catchError(error => {
            return of(
              fromShopActions.loadOrdersFail({
                error
              })
            );
          })
        )
      )
    )
  );

  loadOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromShopActions.loadOrder),
      switchMap(({ id }) =>
        this.shopService.getOrder(id).pipe(
          map((res: any) => {
            return fromShopActions.loadOrderSuccess({
              entity: res.data
            });
          }),
          catchError(error => {
            return of(
              fromShopActions.loadOrderFail({
                error
              })
            );
          })
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromShopActions.updateOrder),
      switchMap(action =>
        this.shopService.updateOrder(action.update.orderId, action.update).pipe(
          map((res: any) => {
            return fromShopActions.updateOrderSuccess({
              entity: res.data
            });
          }),
          catchError(error => {
            return of(
              fromShopActions.updateOrderFail({
                error
              }),
              undo(action)
            );
          })
        )
      )
    )
  );
  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromShopActions.createOrder),
      switchMap(action =>
        this.shopService.createOrder(action.new).pipe(
          map((res: any) => {
            return fromShopActions.createOrderSuccess({
              entity: res.data
            });
          }),
          catchError(error => {
            return of(
              fromShopActions.createOrderFail({
                error
              }),
              undo(action)
            );
          })
        )
      )
    )
  );
  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromShopActions.deleteOrder),
      switchMap(action =>
        this.shopService.deleteOrder(action.id).pipe(
          map(() => {
            return fromShopActions.deleteOrderSuccess();
          }),
          catchError(error => {
            return of(
              fromShopActions.deleteOrderFail({
                error
              }),
              undo(action)
            );
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private shopService: ShopService
  ) { }
}
