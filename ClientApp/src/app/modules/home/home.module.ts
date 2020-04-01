//import { FilterItemBuildsPipe } from './services/filter-item-builds.pipe';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from './../../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [ 
  { path: '', component: HomeComponent }
];


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    // BrowserAnimationsModule,
    // CommonModule,
    // FontAwesomeModule,
    // FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    BsDropdownModule,
    LayoutModule
  ],
  entryComponents: [

  ],
  exports: [
    RouterModule
  ]
  // bootstrap: [AboutComponent]
})
export class HomeModule { }
