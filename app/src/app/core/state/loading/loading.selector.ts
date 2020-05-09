import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './loading.model';
import { MODULE_ID } from './loading.constant';

export const getSlice = createFeatureSelector<State>(MODULE_ID);

export const getData = createSelector(getSlice, (s) => s.data);

export const getMap = createSelector(getData, (d) =>
  d.reduce((mp, id) => {
    mp[id] = true;
    return mp;
  }, {})
);

export const getByKey = (key: string) => createSelector(getMap, (mp) => mp[key]);
