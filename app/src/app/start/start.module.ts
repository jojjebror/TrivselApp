import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { StartRoutingModule } from './start-routing.module';

import { views } from './views';
import { reducers, effects } from './state';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

@NgModule({
  imports: [
    SharedModule,
    StartRoutingModule,
    StoreModule.forFeature('home', reducers),
    //StoreModule.forFeature('office', reducers),
    EffectsModule.forFeature(effects),
    StoreDevtoolsModule.instrument(),
    NgxAudioPlayerModule,
  ],
  exports: [],
  declarations: [...views],
  providers: [],
})
export class StartModule {}
