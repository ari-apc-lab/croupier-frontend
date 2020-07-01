import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Application } from '../application';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-appsearch',
  templateUrl: './appsearch.component.html',
  styleUrls: ['./appsearch.component.css']
})
export class AppsearchComponent implements OnInit {

  applications$: Observable<Application[]>;
  private searchTerms = new Subject<string>();

  constructor(private appService: ApplicationService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.applications$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.appService.searchApplications(term)),
    );
  }

}
