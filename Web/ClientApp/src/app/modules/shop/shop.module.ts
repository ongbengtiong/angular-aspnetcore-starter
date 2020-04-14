
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from './../../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
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



const routes: Routes = [
  {
    path: '', component: ShopPage, children: [
      { path: '', pathMatch: 'full', component: ShopFrontPage },
      { path: 'shop-front', component: ShopFrontPage },
      { path: "checkout", component: CheckoutPage }
    ]
  }
];

@NgModule({
  declarations: [
    ShopPage,
    ShopFrontPage,
    CheckoutPage,
    ProductListComponent,
    CartComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    BsDropdownModule,
    LayoutModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('shop', reducer),
    EffectsModule.forFeature([ShopEffects])
  ],
  entryComponents: [

  ],
  exports: [
    RouterModule
  ],
  //providers: [EntitiesResolver, EntityResolver]
})
export class ShopModule { }
