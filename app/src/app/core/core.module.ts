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
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';

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

    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot()
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
