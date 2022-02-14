import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AppInstance } from '../../instances/app-instance';
import { AppInstanceService } from '../../instances/app-instance.service';

import { Application } from '../application';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-appsearch',
  templateUrl: './appsearch.component.html',
  styleUrls: ['./appsearch.component.css']
})
export class AppsearchComponent implements OnInit {

  applications$: Observable<Application[]>;
  instances$: Observable<AppInstance[]>;
  searchOption = 'both';
  searchOptionList = [
    {name: 'Application', code: 'app'},
    {name: 'Instance', code: 'ins'},
    {name: 'Both', code: 'both'}
  ];
  private searchTerms = new Subject<string>();

  constructor(
    private appService: ApplicationService,
    private instanceService: AppInstanceService
  ) { }

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

    this.instances$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.instanceService.searchAppInstances(term)),
    );
  }



}
