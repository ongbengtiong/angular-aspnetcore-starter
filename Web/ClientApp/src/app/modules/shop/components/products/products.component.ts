import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { select, Store } from '@ngrx/store';
import { fromShopActions } from '../../store/actions';
import { selectAllProducts } from '../../store/selectors';
import { QueryParams } from '../../../../shared/models/query-params'; 
import { Product } from '../../models/product';
import { PaginationComponent } from 'ngx-bootstrap/pagination/public_api';
 
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [`.thumbnail{        
    width: 100px; 
    overflow: auto;
}`]
})
export class ProductsComponent implements OnInit {
  title = "Products Page";
  pagination; 

  queryParams = new QueryParams();
  // entities$ = this.store.pipe(select(selectAllProducts));
  entities$;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(fromShopActions.loadProducts({ queryParams: this.queryParams }));
    this.store.pipe(select(selectAllProducts)).subscribe((value) => {
      
      this.entities$ = value.data;
      this.pagination = value.pagination;
      
    });
  }
  trackByMethod(index: number, el: Product): number {
    return el.productId;
  }
  pageChanged($event) {
    const queryParams = new QueryParams()
    queryParams.page = $event.page;
    queryParams.pageSize = $event.itemsPerPage;

    this.store.dispatch(fromShopActions.loadProducts({ queryParams: queryParams }));
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
