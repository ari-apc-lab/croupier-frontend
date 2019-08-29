import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { AppInstance } from './app-instance';

import { MessageService } from '../../shared/utils/message.service';
import { Application } from '../applications/application';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'instance/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppInstanceService {
  private instancesUrl = 'api/instances'; // URL to web api

  constructor(private http: HttpClient, private msgService: MessageService) {}

  /** GET instances from the server */
  getAppInstances(application: Application): Observable<AppInstance[]> {
    const url = `${this.instancesUrl}/?app=${application.id}`;

    return this.http.get<AppInstance[]>(url).pipe(
      tap(_ => this.log('fetched instances')),
      catchError(this.handleError<AppInstance[]>('getAppInstances', []))
    );
  }

  /** GET app by id. Will 404 if id not found */
  getAppInstance(id: number): Observable<AppInstance> {
    const url = `${this.instancesUrl}/${id}`;

    return this.http.get<AppInstance>(url).pipe(
      tap(_ => this.log(`fetched app id=${id}`)),
      catchError(this.handleError<AppInstance>(`getAppInstance id=${id}`))
    );
  }

  /* GET instances whose name contains search term */
  searchAppInstances(term: string): Observable<AppInstance[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<AppInstance[]>(`${this.instancesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found instances matching "${term}"`)),
      catchError(this.handleError<AppInstance[]>('searchAppInstances', []))
    );
  }

  /** PUT: update the app on the server */
  updateAppInstance(app: AppInstance): Observable<any> {
    return this.http.put(this.instancesUrl, app, httpOptions).pipe(
      tap(_ => this.log(`updated app id=${app.id}`)),
      catchError(this.handleError<any>('updateAppInstance'))
    );
  }

  /** POST: add a new instance to the server */
  addAppInstance(formValue): Observable<HttpResponse<Application>> {
    const data = toFormData(formValue);

    return this.http
      .post(this.instancesUrl, data, {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        tap((response: HttpResponse<Application>) =>
          this.log(`added instance w/ id=${response.body.id}`)
        ),
        catchError(this.handleError<HttpResponse<Application>>('addAppInstance'))
      );
  }

  /** DELETE: delete the app from the server */
  deleteAppInstance(app: AppInstance | number): Observable<AppInstance> {
    const id = typeof app === 'number' ? app : app.id;
    const url = `${this.instancesUrl}/${id}`;

    return this.http.delete<AppInstance>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted app id=${id}`)),
      catchError(this.handleError<AppInstance>('deleteAppInstance'))
    );
  }

  /** Log an AppInstanceService message with the MessageService */
  private log(message: string) {
    this.msgService.add(`AppInstanceService: ${message}`);
  }

  // Handle Http operation that failed.
  // Let the app continue.
  // @param operation - name of the operation that failed
  // @param result - optional value to return as the observable result
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

export function toFormData<T>(formValue: T): FormData {
  const formData = new FormData();

  for (const key of Object.keys(formValue)) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}
