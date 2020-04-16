import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { fromShopActions } from '../../store/actions';
import { selectAllProducts } from '../../store/selectors';
import { QueryParams } from '../../../../shared/models/query-params';
import { Product } from '../../models/product';
import { PaginationComponent } from 'ngx-bootstrap/pagination/public_api';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Subject, merge, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

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


  displayedColumns = ["productId", "title", "category", "price", "size", "artDescription"];
  public dataSource: MatTableDataSource<Product>;
  public filterSubject = new Subject<string>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private filter: string = "";
  public noData: Product[] = [<Product>{}];

  public defaultSort: Sort = { active: 'title', direction: 'asc' };
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    //this.store.dispatch(fromShopActions.loadProducts({ queryParams: this.queryParams }));
    this.store.pipe(select(selectAllProducts)).subscribe((value) => {
      const entities = value.data;
      this.pagination = value.pagination;
      this.initializeData(entities);

      // this.entities$ = value.data;

    });
  }
  trackByMethod(index: number, el: Product): number {
    return el.productId;
  }
  /* pageChanged($event) {
     const queryParams = new QueryParams()
     queryParams.page = $event.page;
     queryParams.pageSize = $event.itemsPerPage;
 
     this.store.dispatch(fromShopActions.loadProducts({ queryParams: queryParams }));
   }*/
  public ngAfterViewInit(): void {
    this.loadEntities();
    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
      })
    );

    let sort$ = this.sort.sortChange.pipe(tap(() => this.paginator.pageIndex = 0));

    let page$ = this.paginator.page.pipe(
      tap(() => {
        console.log(this.paginator.pageIndex);
      }
      )
    );

    this.subscription.add(
      merge(filter$, sort$, page$)
        .pipe(
          tap(() => {
            this.loadEntities()
          })
        ).subscribe());
  }
  private initializeData(products: Product[]): void {
    const productsView = [...products];
    this.dataSource = new MatTableDataSource(products.length ? productsView : this.noData);
  }
  delete(id: number) {
    // Call delete action
    const result = confirm("Are you sure you want to delete this entity?");


    if (result) {
      // Logic to delete the item
      this.store.dispatch(fromShopActions.deleteProduct({ id }));
    }
  }
  private loadEntities(): void {
    const page = (this.paginator.pageIndex == 0) ? 1 : this.paginator.pageIndex;
    const sort = (this.sort.direction === 'desc' ? "-" : "") + this.sort.active;
    this.store.dispatch(fromShopActions.loadProducts({
      queryParams: <QueryParams>{
        filter: this.filter.toLocaleLowerCase(),
        page: this.paginator.pageIndex+1,
        pageSize: this.paginator.pageSize,
        sort: sort
      }
    }));
  }
  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
