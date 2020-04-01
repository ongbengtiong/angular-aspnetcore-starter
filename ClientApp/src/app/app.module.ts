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
        loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
      },

    ]),
    HttpClientModule,
    FormsModule,
   
    SharedModule
    //HomeModule
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
