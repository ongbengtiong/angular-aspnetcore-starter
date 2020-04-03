 
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 

import { SharedModule } from './../../shared/shared.module'; 
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RouterModule, Routes } from '@angular/router'; 
import { MaterialModule } from '../../shared/material.module';  
import { EntitiesPage } from './pages/entities/entities.page';


 
const routes: Routes = [
  {
    path: '', component: EntitiesPage 
  }
];

@NgModule({
  declarations: [
    EntitiesPage, 
  ],
  imports: [ 
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    BsDropdownModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [

  ],
  exports: [
    RouterModule
  ]
})
export class EntityModule { }
