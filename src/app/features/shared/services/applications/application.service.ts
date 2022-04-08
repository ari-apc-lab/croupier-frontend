import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

import { Application } from './application';

import { MessageService } from '../../utils/message.service';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private applicationsUrl = environment.apiUrl + 'apps/'; // URL to web api

  constructor(private http: HttpClient, private msgService: MessageService) {}

  /** GET applications from the server */
  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.applicationsUrl).pipe(
      tap(_ => this.log('fetched applications')),
     // catchError(this.handleError<Application[]>('getApplications', []))
    );
  }

  /** GET app by id. Will 404 if id not found */
  getApplication(id: number): Observable<Application> {
    const url = `${this.applicationsUrl}${id}`;
    return this.http.get<Application>(url).pipe(
      tap(_ => this.log(`fetched app id=${id}`)),
      catchError(this.handleError<Application>(`getApplication id=${id}`))
    );
  }

  /* GET applications whose name contains search term */
  searchApplications(term: string): Observable<Application[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Application[]>(`${this.applicationsUrl}?name=${term}`).pipe(
      tap(_ => this.log(`found applications matching "${term}"`)),
      catchError(this.handleError<Application[]>('searchApplications', []))
    );
  }

  /** PUT: update the app on the server */
  updateApplication(app: Application): Observable<any> {
    return this.http.put(this.applicationsUrl, app, { headers }).pipe(
      tap(_ => this.log(`updated app id=${app.id}`)),
      catchError(this.handleError<any>('updateApplication'))
    );
  }

  /** POST: add a new application to the server */
  addApplication(formValue): Observable<HttpResponse<Application>> {
    const data = toFormData(formValue); // TODO add owner

    return this.http
      .post(this.applicationsUrl, data, {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        tap((response: HttpResponse<Application>) =>
          this.log(`added application w/ id=${response}`)
        ),
        catchError(this.handleError<HttpResponse<Application>>('addApplication'))
      );
  }

  /** DELETE: delete the app from the server */
  deleteApplication(app: Application | number): Observable<Application> {
    const id = typeof app === 'number' ? app : app.id;
    const url = `${this.applicationsUrl}${id}`;
    return this.http.delete<Application>(url, { headers }).pipe(
      tap(_ => this.log(`deleted app id=${id}`)),
      catchError(this.handleError<Application>('deleteApplication'))
    );
  }

  /** Log an ApplicationService message with the MessageService */
  private log(message: string) {
    this.msgService.add(`ApplicationService: ${message}`);
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
