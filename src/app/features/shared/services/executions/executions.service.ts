import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'instance/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExecutionsService {
  private executionUrl = environment.apiUrl + 'executions/'; // URL to web api

  constructor(private http: HttpClient) { }

  getExecutions(): Observable<any> {
    const url = `${this.executionUrl}`;
    console.log('url', url);
    return this.http.get(url);
  }

  getExecutionByInstance(instance): Observable<any> {
    const url = this.executionUrl + '?name=' + instance;
    return this.http.get(url, httpOptions);
  }

  getExecution(id): Observable<any> {
    const url = this.executionUrl  + id;
    return
  }
}
