import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, take } from "rxjs/operators";
 
import { fromShopActions } from "../store/actions";
import { EntityPartialState } from "../store/product/reducer";
import { selectProduct} from "../store/selectors";
import { Product } from "../models/product";

@Injectable()
export class ProductResolver implements Resolve<Product> {
  constructor(private store: Store<EntityPartialState>) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    const entity$ = this.store.pipe(
      select(selectProduct, { id: route.params.id })
    );

    return entity$.pipe(
      filter(entity => {
        if (!entity) {
          this.store.dispatch(
            fromShopActions.loadProduct({ id: route.params.id })
          );
        }

        return !!entity;
      }),
      take(1)
    );
  }
}
