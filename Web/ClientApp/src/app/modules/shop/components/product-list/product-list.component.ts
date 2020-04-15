import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { select, Store } from '@ngrx/store';
import { fromShopActions } from '../../store/actions';
import { selectAllProducts } from '../../store/selectors';
import { ShopService } from '../../services/shop.service';
import { QueryParams } from '../../../../shared/models/query-params';
 
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  title = "product-list Page";

  queryParams = new QueryParams();
  // entities$ = this.store.pipe(select(selectAllProducts));
  entities$;
  pagination;

  constructor(private store: Store<any>, private shopService: ShopService) { }

  ngOnInit(): void {
    this.store.dispatch(fromShopActions.loadProducts({ queryParams: this.queryParams }));
    this.store.pipe(select(selectAllProducts)).subscribe((value) => {

      this.entities$ = value.data;
      this.pagination = value.pagination;

    });
  }
  addProduct(product) {
    this.shopService.AddToOrder(product);
  }
  pageChanged($event) {
    const queryParams = new QueryParams()
    queryParams.page = $event.page;
    queryParams.pageSize = $event.itemsPerPage;

    this.store.dispatch(fromShopActions.loadProducts({ queryParams: queryParams }));
  }
 /* delete(id: number) {
    // Call delete action
    const result = confirm("Are you sure you want to delete this entity?");

    if (result) {
      // Logic to delete the item
      this.store.dispatch(fromShopActions.deleteEntity({ id }));
    }
  }
  */
}
