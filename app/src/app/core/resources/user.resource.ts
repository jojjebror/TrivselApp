import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResource } from './api.resource';

import { User } from '../../shared/models';
import { Office } from "src/app/shared/models/dto/OfficeDto";
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

  getOffices(): Observable<Office[]>{
    return this.get('user/Offices');
  }

}

