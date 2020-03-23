import { ApiResource } from "./api.resource";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Event } from '../../shared/models';

@Injectable()
export class EventResource extends ApiResource {
  constructor(http: HttpClient) {
    super(http);
  }

  loadEvents(): Observable<Event[]> {
    return this.get('event');
  }

  loadEvent(id: number): Observable<Event> {
    return this.get('event/' + id);
  }

  createEvent(ev: Event): Observable<Event> {
    return this.post('event', ev);
  }

  deleteEvent(id: number): Observable<Event[]> {
    return this.delete('event/' + id);
  }

  updateEvent(id: number, ev: Event): Observable<Event> {
    console.log('event: ' + ev);
    return this.put('event/' + id, ev);
  }
}
