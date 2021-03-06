import { ApiResource } from './api.resource';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Event, Post, PodcastEpisode } from '../../shared/models';

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

  loadUsersEvents(id: number): Observable<Event[]> {
    return this.get('event/' + id + '/getuserevents');
  }

  createEvent(ev: Event): Observable<Event> {
    return this.post('event', ev);
  }

  deleteEvent(id: number) {
    return this.delete('event/' + id);
  }

  updateEvent(ev: Event): Observable<Event> {
    return this.put('event/' + ev.id, ev);
  }

  addEventParticipantStatus(data: any[]): Observable<Event> {
    return this.post('event/' + data[0] + '/' + data[1], data[2]);
  }

  updateParticipantStatus(data: any[]): Observable<Event> {
    return this.post('event/' + data[0] + '/' + data[1] + '/update', data[2]);
  }

  uploadImage(id: number, image: File): Observable<Event> {
    var formData = new FormData();
    formData.append('image', image, image.name);
    return this.post2('event/' + id + '/uploadimage', formData);
  }

  createPost(data: Post): Observable<Post> {
    return this.post('post', data);
  }

  deletePost(data: any[]): Observable<Event> {
    return this.delete('post/' + data[0] + '/' + data[1]);
  }
}
