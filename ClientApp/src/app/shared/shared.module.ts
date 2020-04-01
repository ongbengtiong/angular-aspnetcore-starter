import { NgModule } from '@angular/core';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
   // BrowserAnimationsModule,
    RouterModule
  ],
  declarations: [
    NavMenuComponent,
    FooterComponent
  ],

  exports: [
    CommonModule,
    FormsModule, 
    FooterComponent,
    NavMenuComponent,
  ],

})
export class SharedModule { }
