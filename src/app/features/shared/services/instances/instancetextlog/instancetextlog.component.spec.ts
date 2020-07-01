import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancetextlogComponent } from './instancetextlog.component';

describe('InstancetextlogComponent', () => {
  let component: InstancetextlogComponent;
  let fixture: ComponentFixture<InstancetextlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstancetextlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancetextlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
