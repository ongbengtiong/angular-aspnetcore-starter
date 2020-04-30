

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../shared/services/config.service';
import { Product } from '../models/product';
import { Order, OrderItem } from '../models/order';
import { AccountService } from '../../../shared/services/account.service';
import { map, catchError } from 'rxjs/operators';
import { QueryParams } from '../../../shared/models/query-params';
import { of, Observable } from 'rxjs';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
    withCredentials: true
  };
  private baseURL: string;
  private baseProductsURL; string;
  private baseOrdersURL: string;


  public order: Order = new Order();


  constructor(public http: HttpClient, private configService: ConfigService, private accountService: AccountService) {
    this.baseURL = configService.apiUrl;
    this.baseProductsURL = `${this.baseURL}/products`;
    this.baseOrdersURL = `${this.baseURL}/orders`;

  }
  /*** Products ****/
  createProduct(entity: Product) {
    return this.http.post(`${this.baseProductsURL}`, entity, {
      headers: {
        'Authorization': 'Bearer ' + this.accountService.getToken()
      }
    });

  }

  // https://stackoverflow.com/questions/45505619/angular-4-3-3-httpclient-how-get-value-from-the-header-of-a-response
  getProducts(queryParams: QueryParams) {
    const queryString = `sort=${queryParams.sort}&page=${queryParams.page}&pageSize=${queryParams.pageSize}`;
    return this.http.get<Product[]>(`${this.baseProductsURL}?${queryString}`, {
      headers: {
        'Authorization': 'Bearer ' + this.accountService.getToken()
      },
      observe: 'response'
    }).pipe(
      map(response => {
        const paginationString = response.headers.get('X-Pagination');
        const pagination = JSON.parse(paginationString);
        return {
          data: response.body,
          pagination: pagination
        };

      })
    );
  }
  getProduct(id: number) {
    return this.http.get(`${this.baseProductsURL}/${id}`);
  }
  updateProduct(id: any, update: Product) {
    return this.http.put(`${this.baseProductsURL}/${id}`, update);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.baseProductsURL}/${id}`);
  }

  /*** Orders ****/
  createOrder(entity: Order) {
    return this.http.post(`${this.baseOrdersURL}`, entity);
  }
  getOrders() {
    return this.http.get(`${this.baseOrdersURL}`);
  }
  getOrder(id: number) {
    return this.http.get(`${this.baseOrdersURL}/${id}`);
  }
  updateOrder(id: any, update: Order) {
    return this.http.put(`${this.baseOrdersURL}/${id}`, update);
  }
  deleteOrder(id: number) {
    return this.http.delete(`${this.baseOrdersURL}/${id}`);
  }

  public checkout() {
    if (!this.order.orderNumber) {
      this.order.orderNumber = this.order.orderDate.getFullYear().toString() + this.order.orderDate.getTime().toString();
    }

    return this.http.post('/api/orders', this.order, {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken() })
    })
      .pipe(
        map(response => {
          this.order = new Order();
          return true;
        }));
  }

  public AddToOrder(product: Product) {

    let item: OrderItem = this.order.items.find(i => i.productId === product.productId);

    if (item) {

      item.quantity++;

    } else {

      item = new OrderItem();
      item.productId = product.productId;
      item.productArtist = product.artist;
      item.productCategory = product.category;
      item.productArtId = product.artId;
      item.productTitle = product.title;
      item.productImageUrl = product.imageUrl;
      item.productSize = product.size;
      item.unitPrice = product.price;
      item.quantity = 1;

      this.order.items.push(item);
    }
  }
  /*
  getEntity(id: number) {
    return this.http.get(`${this.baseURL}/entities/${id}`);
  }

  createEntity(entity: Entity) {
    return this.http.post(`${this.baseURL}/entities`, entity);
  }

  updateEntity(id: number, update: Entity) {
    return this.http.put(`${this.baseURL}/entities/${id}`, update);
  }

  deleteEntity(id: number) {
    return this.http.delete(`${this.baseURL}/entities/${id}`);
  } 
  */

  searchCategory(value: string): Observable<Category[]> {
    if (value === '') { return of([]); }
    const url = `${this.baseProductsURL}/categories/get?filter=${value}`;
    return this.http.post(url, this.httpOptions)
      .pipe(
        map((res: Category[]) => {
          return res; 
        }),
        catchError((error) => {
          console.group(`Posting to ${url}`);
          console.error(error);
          console.groupEnd();
          return of([]);
        })
      );
  }
}
