import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZammadComponent } from './zammad.component';

describe('ZammadComponent', () => {
  let component: ZammadComponent;
  let fixture: ComponentFixture<ZammadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZammadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZammadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
