import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';

import { LoginRoutingModule } from './receipt-routing.module';

import { reducers, effects } from './state';
import { views } from './views';
import { components } from './components';

@NgModule({
    imports: [SharedModule, LoginRoutingModule, StoreModule.forFeature('receipt', reducers), EffectsModule.forFeature(effects)],
    exports: [],
    declarations: [...views, ...components],
    providers: []
})
export class ReciptModule {}