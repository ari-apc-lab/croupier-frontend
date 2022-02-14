import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoviseVisualizeComponent } from './covise-visualize.component';

describe('CoviseVisualizeComponent', () => {
  let component: CoviseVisualizeComponent;
  let fixture: ComponentFixture<CoviseVisualizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoviseVisualizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoviseVisualizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
