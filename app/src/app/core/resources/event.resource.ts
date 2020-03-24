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

  updateEvent(ev: Event): Observable<Event> {
    return this.put('event/'+ ev.id, ev);
  }

  acceptInvite(data: number[]): Observable<Event[]> {
    return this.post('event/' + data[0] + '/' + data[1], {});
  }
}
