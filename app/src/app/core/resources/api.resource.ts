import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Error } from '../../shared/models';

/**
 * Base class for all resources communicating with the API.
 * Contains functions for request etc.
 *
 * Should be the base class of all API resources.
 */
export abstract class ApiResource {
         private baseUrl: string = environment.api.url;

         constructor(private http: HttpClient) {}

         /**
          * HTTP methods. Adds the required headers and base url.
          */
         protected get<T>(url: string): Observable<T> {
           return this.http.get<T>(`${this.baseUrl}/${url}`, this.createOptions()).pipe(map(this.mapResponse), catchError(this.mapError));
         }
         
         protected put<T>(url: string, data: any): Observable<T> {
           return this.http.put<T>(`${this.baseUrl}/${url}`, JSON.stringify(data), this.createOptions()).pipe(map(this.mapResponse), catchError(this.mapError));
         }

         protected post<T>(url: string, data: any): Observable<T> {
           return this.http
             .post<T>(`${this.baseUrl}/${url}`, JSON.stringify(data), this.createOptions())
             .pipe(map(this.mapResponse), catchError(this.mapError));
         }

         //Post for image
         protected post2<T>(url: string, data: any): Observable<T> {
           return this.http.post<T>(`${this.baseUrl}/${url}`, data, this.createOptions2()).pipe(map(this.mapResponse), catchError(this.mapError));
         }

         protected delete<T>(url: string): Observable<T> {
           return this.http.delete<T>(`${this.baseUrl}/${url}`, this.createOptions()).pipe(map(this.mapResponse), catchError(this.mapError));
         }

         /**
          * Maps the api response to model object
          */
         private mapResponse<T>(response: any): T {
           return <T>response.data;
         }

         private mapError(errorResponse: HttpErrorResponse, caught: any): Observable<any> {
           let error;

           if (!errorResponse.status) {
             error = new Error();
             error.message = 'Det gick inte att få kontakt med servern';
           } else error = errorResponse.error;

           return throwError(error);
         }

         /**
          * Creates required request options
          */
         private createOptions(): { headers: HttpHeaders } {
           let headers = new HttpHeaders();

           // Set content type
           headers = headers.set('Content-Type', 'application/json');

           return { headers: headers };
         }

         //To save image
         private createOptions2(): { headers: HttpHeaders } {
           let headers = new HttpHeaders();

           // Set content type
           headers = headers.set('Content-Disposition', 'multipart/form');

           return { headers: headers };
         }
       }
