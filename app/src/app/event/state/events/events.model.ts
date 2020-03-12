import { EntityState } from "@ngrx/entity";

import { Event } from '../../../shared/models';

export interface EventsState extends EntityState<Event> {
    loading: boolean;
}