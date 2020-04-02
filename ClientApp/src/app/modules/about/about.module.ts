//import { FilterItemBuildsPipe } from './services/filter-item-builds.pipe';
 
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
 
import { SharedModule } from './../../shared/shared.module';
import { AboutComponent } from './pages/about/about.component';
import { CounterComponent } from './components/counter/counter.component'; 
import { IntroComponent } from './components/intro/intro.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: AboutComponent,  children: [
      { path: '', component: IntroComponent  },
      { path: 'counter', component: CounterComponent }, 
    ]
  }
];


@NgModule({
  declarations: [
    AboutComponent,
    CounterComponent, 
    IntroComponent
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
export class AboutModule { }
