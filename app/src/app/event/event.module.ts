import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';

import { LoginRoutingModule } from './event-routing.module';

import { reducers, effects } from './state';
import { views } from './views';
import { components } from './components';

import { TabsModule, BsDatepickerModule, TimepickerModule, PopoverModule } from 'ngx-bootstrap';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule,
    StoreModule.forFeature('event', reducers),
    EffectsModule.forFeature(effects),
    StoreDevtoolsModule.instrument(),
    TabsModule,
    TimepickerModule,
    BsDatepickerModule,
    NgxMaterialTimepickerModule,
    PopoverModule.forRoot()
  ],
  exports: [],
  declarations: [...views, ...components],
  providers: []
})
export class EventModule {}
