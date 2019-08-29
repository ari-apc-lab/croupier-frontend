import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceLogComponent } from './log.component';

describe('LogComponent', () => {
  let component: InstanceLogComponent;
  let fixture: ComponentFixture<InstanceLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstanceLogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
