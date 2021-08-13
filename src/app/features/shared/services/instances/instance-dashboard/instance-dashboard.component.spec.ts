import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDashboardComponent } from './instance-dashboard.component';

describe('InstanceDashboardComponent', () => {
  let component: InstanceDashboardComponent;
  let fixture: ComponentFixture<InstanceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstanceDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
