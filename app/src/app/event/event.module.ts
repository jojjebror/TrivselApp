import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';

import { EventRoutingModule } from './event-routing.module';

import { reducers, effects } from './state';
import { views } from './views';
import { components } from './components';

import { TimepickerModule, PopoverModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    SharedModule,
    EventRoutingModule,
    StoreModule.forFeature('event', reducers),
    EffectsModule.forFeature(effects),
    StoreDevtoolsModule.instrument(),
    TimepickerModule,
    PopoverModule.forRoot()
  ],
  exports: [],
  declarations: [...views, ...components],
  providers: []
})
export class EventModule {}
