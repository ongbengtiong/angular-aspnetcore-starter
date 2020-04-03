//import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
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
import { catchError, map } from 'rxjs/operators';
import { of, Observable, ObservableInput } from 'rxjs';
import { ConfigService } from './shared/services/config.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { StoreModule } from '@ngrx/store';

export function load(http: HttpClient, config: ConfigService): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      http.get('./config')
        .pipe(
          map((x: ConfigService) => {
            config.baseUrl = x.baseUrl;
            resolve(true);
          }),
          catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
            if (x.status !== 404) {
              resolve(false);
            }
            config.baseUrl = 'http://localhost:8080/api';
            resolve(true);
            return of({});
          })
        ).subscribe();
    });
  };
}

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
      }, {
        path: 'bpm',
        loadChildren: () => import('./modules/bpm/bpm.module').then(m => m.BpmModule)
      },

    ]),
    HttpClientModule,
    FormsModule,

    SharedModule,
    MaterialModule,
    BsDropdownModule.forRoot(),

    LayoutModule,
    HomeModule,
    FontAwesomeModule,
    EntityDataModule.forRoot(entityConfig),
    StoreModule.forRoot({}, {})
  ],
  providers: [
    {
      provide: AppSettings,
      useFactory: appSettingsFactory(),
      multi: false
    },
    {
      provide: APP_INITIALIZER,
      useFactory: load,
      deps: [
        HttpClient,
        ConfigService
      ],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
