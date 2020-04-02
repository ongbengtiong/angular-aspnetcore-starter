//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppSettings } from './app.settings';
import { appSettingsFactory } from './app.settings.factory';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { MaterialModule } from './shared/material.module';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { HomeModule } from './modules/home/home.module';
import { BackgroundComponent } from './modules/home/components/background/background.component';
import { FetchDataComponent } from './modules/home/components/fetch-data/fetch-data.component';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    // BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),

    BrowserAnimationsModule,
    RouterModule.forRoot([

      {
        path: '',
        //loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
        component: HomeComponent, children: [
          { path: '', component: BackgroundComponent },
          { path: 'background', component: BackgroundComponent },
          { path: 'fetch-data', component: FetchDataComponent }
        ]
      },
      {
        path: 'about',
        loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
      },


    ]),
    HttpClientModule,
    FormsModule,

    SharedModule,
    MaterialModule,
    BsDropdownModule.forRoot(),

    LayoutModule,
    HomeModule
  ],
  providers: [
    {
      provide: AppSettings,
      useFactory: appSettingsFactory(),
      multi: false
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
