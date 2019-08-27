import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInstanceListComponent } from './list.component';

describe('ListComponent', () => {
  let component: AppInstanceListComponent;
  let fixture: ComponentFixture<AppInstanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppInstanceListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInstanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
