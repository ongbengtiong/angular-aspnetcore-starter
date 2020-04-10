import { NgModule } from '@angular/core';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

import { SidebarModule } from 'primeng/sidebar';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SideBarService } from './components/sidebar/sidebar.service';
@NgModule({
  imports: [
    CommonModule,
   // BrowserAnimationsModule,
    RouterModule,
    SidebarModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],

  exports: [
    CommonModule,
    FormsModule, 
    FooterComponent,
    HeaderComponent,
    SidebarComponent 
  ],
  providers: [SideBarService]
})
export class SharedModule { }
