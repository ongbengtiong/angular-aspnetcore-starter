//import { FilterItemBuildsPipe } from './services/filter-item-builds.pipe';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from './../../shared/shared.module';
import { HomePage } from './pages/home/home.page';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RouterModule, Routes } from '@angular/router';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { BackgroundComponent } from './components/background/background.component';
import { MaterialModule } from '../../shared/material.module';

import { SidebarModule } from 'primeng/sidebar'; 
import { LoginComponent } from './components/login/login.component';

 
const routes: Routes = [
  {
    path: '', component: HomePage, children: [
      { path: '', component: BackgroundComponent },
      { path: 'background', component: BackgroundComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'login', component: LoginComponent}
    ]
  }
];

@NgModule({
  declarations: [
    HomePage,
    FetchDataComponent,
    BackgroundComponent,
    LoginComponent
  ],
  imports: [
    // BrowserAnimationsModule,
    // CommonModule,
    // FontAwesomeModule,
    // FormsModule,
    //RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    BsDropdownModule,
    LayoutModule,
    SidebarModule,
    RouterModule
  ],
  entryComponents: [

  ],
  exports: [
    RouterModule
  ]
  // bootstrap: [AboutComponent]
})
export class HomeModule { }
