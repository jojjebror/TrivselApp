import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';
import { adapter } from './drinks.adapter';
import { state } from '@angular/animations';

const { selectAll } = adapter.getSelectors();

export const selectState = (state: AppState) => state.drink.drs;

export const getDrinks = createSelector(selectState, selectAll );

export const getDrinksLoading = createSelector(selectState, state => state.loading);

export const getDrinksLoaded = createSelector(selectState, state => state.loaded);

export const getError = createSelector(selectState, state => state.error);

export const getCurrentDrinkId = createSelector(selectState, state => state.selectedDrinkId)

export const getCurrentDrink = createSelector(selectState, getCurrentDrinkId, state => state.entities[state.selectedDrinkId])

export const getFilterDrinks = createSelector(selectState, selectAll)