import { NgModule } from '@angular/core';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  imports: [
    CommonModule,
   // BrowserAnimationsModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],

  exports: [
    CommonModule,
    FormsModule, 
    FooterComponent,
    HeaderComponent,
  ],

})
export class SharedModule { }
