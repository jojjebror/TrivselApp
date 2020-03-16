import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';

import { LoginRoutingModule } from './event-routing.module';

import { reducers, effects } from './state';
import { views } from './views';
import { components } from './components';

import { TabsModule } from 'ngx-bootstrap';

@NgModule({
  imports: [SharedModule, LoginRoutingModule, StoreModule.forFeature('event', reducers), EffectsModule.forFeature(effects), TabsModule],
  exports: [],
  declarations: [...views, ...components],
  providers: []
})
export class EventModule {}

 