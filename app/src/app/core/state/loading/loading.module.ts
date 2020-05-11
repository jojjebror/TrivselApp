import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './loading.reducer';
import { MODULE_ID } from './loading.constant';

@NgModule({
  imports: [StoreModule.forFeature(MODULE_ID, reducer)],
})
export class LoadingModule {}
