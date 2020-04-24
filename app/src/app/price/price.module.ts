import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';

import { reducers, effects } from './state';


@NgModule({
  imports: [SharedModule, StoreModule.forFeature('drink', reducers), EffectsModule.forFeature(effects)],
  exports: [],
  declarations: [],
  providers: []
})
export class PriceModule {}

 