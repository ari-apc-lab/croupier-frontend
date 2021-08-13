import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceFormComponent } from './instance-form.component';

describe('InstanceFormComponent', () => {
  let component: InstanceFormComponent;
  let fixture: ComponentFixture<InstanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstanceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
