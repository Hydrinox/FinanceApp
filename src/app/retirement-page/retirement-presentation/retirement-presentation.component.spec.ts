import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementPresentationComponent } from './retirement-presentation.component';

describe('RetirementPresentationComponent', () => {
  let component: RetirementPresentationComponent;
  let fixture: ComponentFixture<RetirementPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirementPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
