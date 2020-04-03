//import { FilterItemBuildsPipe } from './services/filter-item-builds.pipe';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './../../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule, Routes } from '@angular/router';
import { BpmPage } from './pages/bpm/bpm.page';
import { ModelerComponent } from './components/modeler/modeler.component';
import { MaterialModule } from '../../shared/material.module';


const routes: Routes = [
  {
    path: '', component: BpmPage, children: [
      { path: '', component: ModelerComponent },
      { path: 'modeler', component: ModelerComponent },
    ]
  }
];


@NgModule({
  declarations: [
    BpmPage,
    ModelerComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    BsDropdownModule,
    MaterialModule,
    FontAwesomeModule
  ],
  entryComponents: [

  ],
  exports: [
    RouterModule
  ]
})
export class BpmModule { }
