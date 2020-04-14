import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { select, Store } from '@ngrx/store';
import { fromShopActions } from '../../store/actions';
import { selectAllProducts } from '../../store/selectors';
import { ShopService } from '../../services/shop.service';
 
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  title = "product-list Page";

  entities$ = this.store.pipe(select(selectAllProducts));

  constructor(private store: Store<any>, private shopService: ShopService) { }

  ngOnInit(): void {
    this.store.dispatch(fromShopActions.loadProducts());
  }
  addProduct(product) {
    this.shopService.AddToOrder(product);
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
