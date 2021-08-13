import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbNavComponent } from './breadcrumb-nav.component';

describe('BreadcrumbNavComponent', () => {
  let component: BreadcrumbNavComponent;
  let fixture: ComponentFixture<BreadcrumbNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
