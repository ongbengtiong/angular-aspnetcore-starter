//import { FilterItemBuildsPipe } from './services/filter-item-builds.pipe';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AboutRoutingModule } from './about-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { AboutComponent } from './pages/about/about.component';
import { CounterComponent } from './components/counter/counter.component';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { IntroComponent } from './components/intro/intro.component';
@NgModule({
  declarations: [
    AboutComponent,
    CounterComponent,
    FetchDataComponent,
    IntroComponent
  ],
  imports: [
    // BrowserAnimationsModule,
    // CommonModule,
    // FontAwesomeModule,
    // FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    AboutRoutingModule
  ],
  entryComponents: [
 
  ]
})
export class AboutModule { }
