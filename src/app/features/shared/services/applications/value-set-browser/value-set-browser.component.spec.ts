import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueSetBrowserComponent } from './value-set-browser.component';

describe('ValueSetBrowserComponent', () => {
  let component: ValueSetBrowserComponent;
  let fixture: ComponentFixture<ValueSetBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueSetBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueSetBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
