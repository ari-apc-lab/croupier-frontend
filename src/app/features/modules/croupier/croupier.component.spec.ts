import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CroupierComponent } from './croupier.component';

describe('CroupierComponent', () => {
  let component: CroupierComponent;
  let fixture: ComponentFixture<CroupierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CroupierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CroupierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
