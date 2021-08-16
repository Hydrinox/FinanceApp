import { TestBed } from '@angular/core/testing';

import { RetirementCalcService } from './retirement-calc.service';

describe('RetirementCalcService', () => {
  let service: RetirementCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetirementCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
