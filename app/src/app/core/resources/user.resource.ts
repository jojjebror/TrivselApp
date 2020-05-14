import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResource } from './api.resource';

import { User, Offices } from '../../shared/models';

@Injectable()
export class UserResource extends ApiResource {
  constructor(http: HttpClient) {
    super(http);
  }

  getAuthenticated(): Observable<User> {
    return this.get('user/authenticated');
  }

  getUsers(): Observable<User[]> {
    return this.get('user');
  }

  updateOffice(data: number[]): Observable<User> {
    return this.put('user/UpdateOffice/' + data[0] + '/' + data[1], {});
  }

  addCredit(data: number[]): Observable<User> {
    return this.put('user/' + data[0] + '/' + data[1], {});
  }

  getOffices(): Observable<Offices[]>{
    return this.get('user/Offices');
  }
 
}

