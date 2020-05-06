
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from './../../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
// import { NgxBootstrapModule } from '../../shared/ngx-bootstrap.module';
// import { EntityResolver, EntitiesResolver } from './resolvers';
import { ShopPage } from './pages/shop/shop.page';
import { ShopFrontPage } from './pages/shop-front/shop-front.page';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CheckoutPage } from './pages/checkout/checkout.page';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { ShopEffects } from './store/effect';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { ProductResolver } from './resolvers/entity.resolver';
import { ProductsComponent } from './components/products/products.component';
import { ProductPage } from './pages/product/product.page';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ToastrModule } from 'ngx-toastr';
import { MccScrollspyModule } from 'material-community-components';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '', component: ShopPage, children: [
      { path: '', pathMatch: 'full', component: ShopFrontPage },
      { path: 'shop-front', component: ShopFrontPage },
      { path: 'checkout', component: CheckoutPage },
    ]
  },
  {
    path: 'products', component: ProductPage, children: [
      { path: '', component: ProductsComponent },
      {
        path: 'edit/:id', component: ProductComponent,
        resolve: { entity: ProductResolver }
      },
      { path: 'add', component: ProductComponent }
    ]
  },

];

@NgModule({
  declarations: [
    ShopPage,
    ShopFrontPage,
    CheckoutPage,
    ProductListComponent,
    CartComponent,
    ProductPage,
    ProductComponent,
    ProductsComponent,
    ImageUploadComponent,
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    // NgxBootstrapModule,
    LayoutModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('shop', reducer),
    EffectsModule.forFeature([ShopEffects]),
    PaginationModule,
    ToastrModule,
    MccScrollspyModule,
    FlexLayoutModule
  ],
  entryComponents: [

  ],
  exports: [
    RouterModule
  ],
  providers: [ProductResolver]
})
export class ShopModule { }
