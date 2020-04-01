import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { SystemConfigurationTreeComponent } from './components/system-configuration-tree/system-configuration-tree.component';
// import { SystemConfigurationResolver } from './services/system-configuration.resolver';
import { CounterComponent } from './components/counter/counter.component';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { IntroComponent } from './components/intro/intro.component';
import { AboutComponent } from './pages/about/about.component';


const routes: Routes = [
  {
    path: 'about', component: AboutComponent, children: [
      { path: '', component: IntroComponent, pathMatch: 'full' },
      { path: 'intro', component: IntroComponent},
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent }]
  }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AboutRoutingModule { }
