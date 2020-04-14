import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { select, Store } from '@ngrx/store';
import { fromShopActions } from '../../store/actions';
import { selectAllProducts } from '../../store/selectors';
 
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  title = "Products Page";

  entities$ = this.store.pipe(select(selectAllProducts));

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(fromShopActions.loadProducts());
  }

  delete(id: number) {
    // Call delete action
    const result = confirm("Are you sure you want to delete this entity?");

    if (result) {
      // Logic to delete the item
      this.store.dispatch(fromShopActions.deleteProduct({ id }));
    }
  }

}
