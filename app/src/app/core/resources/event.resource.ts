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

  deleteEvent(id: number) {
    return this.delete('event/' + id);
  }

  updateEvent(ev: Event): Observable<Event> {
    return this.put('event/'+ ev.id, ev);
  }

  addEventParticipant(data: number[]): Observable<Event> {
    return this.post('event/' + data[0] + '/' + data[1], {});
  }

  uploadImage(id: number, image: File): Observable<boolean> {
    console.log(id);
    console.log(image);
    var formData = new FormData();
    formData.append('image', image, image.name);
    return this.post2('event/' + id + '/uploadimage', formData);
  }
}
