import { ApiResource } from "./api.resource";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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

    create(ev: Event): Observable<Event> {
        return this.post('event', ev);
    }
}
