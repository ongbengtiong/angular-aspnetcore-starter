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
import { HomePage } from './modules/home/pages/home/home.page';
import { HomeModule } from './modules/home/home.module';
import { BackgroundComponent } from './modules/home/components/background/background.component';
import { FetchDataComponent } from './modules/home/components/fetch-data/fetch-data.component';
import { catchError, map } from 'rxjs/operators';
import { of, Observable, ObservableInput } from 'rxjs';
import { ConfigService } from './shared/services/config.service';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EntityEffects } from './modules/entity/store/effect';
import { LoginComponent } from './modules/home/components/login/login.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';

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
        component: HomePage, children: [
          { path: '', component: BackgroundComponent },
          { path: 'background', component: BackgroundComponent },
          { path: 'fetch-data', component: FetchDataComponent },
          { path: 'login', component: LoginComponent }
        ]
      },
      {
        path: 'about',
        loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'bpm',
        loadChildren: () => import('./modules/bpm/bpm.module').then(m => m.BpmModule)
      },
      {
        path: 'entities',
        loadChildren: () => import('./modules/entity/entity.module').then(m => m.EntityModule)
      },

      {
        path: 'shop',
        loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)
      },


      

    ]),
    HttpClientModule,
    FormsModule,

    SharedModule,
    MaterialModule,
    BsDropdownModule.forRoot(),

    LayoutModule,
    HomeModule,
  /*  StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),*/
    
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot()
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
