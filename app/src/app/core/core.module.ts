import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';

import { initializer } from './core.initializer';
import { views } from './views';
import { components } from './components';
import { services, AuthenticationInterceptor } from './services';
import { resources } from './resources';
import { guards } from './guards';
import { reducers, effects } from './state';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule, TabsModule, TimepickerModule, BsDatepickerModule } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { svLocale } from 'ngx-bootstrap/locale';
        defineLocale('sv', svLocale);
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/**
 * Contains all core functionality of the application.
 * Imported by the root module.
 */
@NgModule({
  imports: [
    HttpClientModule,
    RouterModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument(),

    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    
  ],
  exports: [],
  declarations: [...views, ...components],
  providers: [
    ...services,
    ...resources,
    ...guards,
    initializer,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
