import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { UserRoutingModule } from './user-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, effects } from './state';
import { views } from './views';
import { components } from './components';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature(effects),
    //StoreDevtoolsModule.instrument()
  ],
  exports: [],
  declarations: [...views, ...components],
  providers: []
})
export class UserModule {}

