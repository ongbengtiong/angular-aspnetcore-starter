//import { FilterItemBuildsPipe } from './services/filter-item-builds.pipe';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from './../../shared/shared.module';
import { AboutPage } from './pages/about/about.page';
import { CounterComponent } from './components/counter/counter.component';
import { IntroComponent } from './components/intro/intro.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RouterModule, Routes } from '@angular/router';
import { ScrollspyExamplesComponent } from './components/scrollspy-example/scrollspy-example.component';
import { MccScrollspyModule } from 'material-community-components';
import { MaterialModule } from 'src/app/shared/material.module';


const routes: Routes = [
  {
    path: '', component: AboutPage, children: [
      { path: '', component: IntroComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'scrollspy', component: ScrollspyExamplesComponent },
    ]
  }
];


@NgModule({
  declarations: [
    AboutPage,
    CounterComponent,
    IntroComponent,
    ScrollspyExamplesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    BsDropdownModule,
    LayoutModule,
    MccScrollspyModule,
    MaterialModule
  ],
  entryComponents: [

  ],
  exports: [
    RouterModule
  ]
})
export class AboutModule { }
