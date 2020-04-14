
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from './../../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { EntitiesComponent } from './components/entities/entities.component';
import { EntityComponent } from './components/entity/entity.component';
import { EntityPage } from './pages/entity/entity.page';
import { EntityResolver, EntitiesResolver } from './resolvers';
import { StoreModule } from '@ngrx/store';
import { EffectsFeatureModule, EffectsModule } from '@ngrx/effects';
import { EntityEffects } from './store/effect';
import { reducer } from './store/reducer';


const routes: Routes = [
  {
    path: '', component: EntityPage, children: [
      {
        path: '', component: EntitiesComponent, resolve: {
          entityLoaded: EntitiesResolver
        }
      },
      {
        path: "edit/:id", component: EntityComponent,
        resolve: { entity: EntityResolver }
      },
      { path: "add", component: EntityComponent }
    ]
  }
];

@NgModule({
  declarations: [
    EntityPage,
    EntitiesComponent,
    EntityComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    BsDropdownModule,
    LayoutModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('entity', reducer),
    EffectsModule.forFeature([EntityEffects]),
  ],
  entryComponents: [

  ],
  exports: [
    RouterModule
  ],
  providers: [EntitiesResolver, EntityResolver]
})
export class EntityModule { }
