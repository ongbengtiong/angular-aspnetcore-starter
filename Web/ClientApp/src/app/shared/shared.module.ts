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
import { LeftBarService } from './components/left-bar/left-bar.service';
import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    RouterModule,
    SidebarModule,
    MaterialModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LeftBarComponent
  ],

  exports: [
    CommonModule,
    FormsModule, 
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LeftBarComponent
  ],
  providers: [SideBarService, LeftBarService]
})
export class SharedModule { }
