import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApplicationService } from '../application.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-value-set-browser',
  templateUrl: './value-set-browser.component.html',
  styleUrls: ['./value-set-browser.component.css']
})
export class ValueSetBrowserComponent implements OnInit {

  // value set search bar
  valueSet$: Observable<any[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private appService: ApplicationService,
  ) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.valueSet$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.appService.getDatasets(term)),
    );

  }

}
