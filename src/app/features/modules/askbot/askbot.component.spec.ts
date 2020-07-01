import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskbotComponent } from './askbot.component';

describe('AskbotComponent', () => {
  let component: AskbotComponent;
  let fixture: ComponentFixture<AskbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskbotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
